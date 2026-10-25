import fs from 'node:fs'
import path from 'node:path'
import { setTimeout } from 'node:timers/promises'

import { load } from 'cheerio'

const BASE_URL = 'https://developer.chrome.com'
const MV3_URL = `${BASE_URL}/docs/extensions/reference`
const MV2_URL = `${BASE_URL}/docs/extensions/mv2/reference`

const SNAPSHOTS_DIRS = ['snapshots-mv3', 'snapshots-mv2']

const NAV_LINK_SELECTOR = ".devsite-nav-list[menu='_book'] .devsite-nav-item:not(.devsite-nav-deprecated) > a[href]"

// A few requests at a time reuse kept-alive connections: a burst of new connections hits ETIMEDOUT
const CONCURRENCY = 8
const MAX_ATTEMPTS = 4
const RETRY_DELAY = 1000
const TIMEOUT = 30_000

interface Section {
  url: string
  file: string
  /** Snapshots folder of the pages listed in the section sidebar */
  dir?: string
  /** Broken sidebar links */
  ignore?: string[]
  rename?: Record<string, string>
}

interface Page {
  url: string
  file: string
}

const SECTIONS: Section[] = [
  { dir: 'snapshots-mv3/api', file: 'snapshots-mv3/api.md', url: `${MV3_URL}/api` },
  { dir: 'snapshots-mv3/manifest', file: 'snapshots-mv3/manifest.md', url: `${MV3_URL}/manifest` },
  { file: 'snapshots-mv3/permissions-list.md', url: `${MV3_URL}/permissions-list` },
  {
    dir: 'snapshots-mv2/api',
    file: 'snapshots-mv2/index.md',
    ignore: ['enterprise/login', 'devtools/performance'],
    rename: { 'input/ime': 'input_ime' },
    url: MV2_URL,
  },
]

const fetchText = async (url: string, attempt = 1): Promise<string> => {
  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(TIMEOUT) })
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }
    return await response.text()
  } catch (error) {
    if (attempt === MAX_ATTEMPTS) {
      throw new Error(`Failed to fetch ${url}`, { cause: error })
    }
    console.warn(`Retrying ${url} (attempt ${attempt} failed)`)
    await setTimeout(attempt * RETRY_DELAY)
    return fetchText(url, attempt + 1)
  }
}

const getPages = async ({ url, file, dir, ignore = [], rename = {} }: Section): Promise<Page[]> => {
  if (!dir) {
    return [{ file, url }]
  }

  const $ = load(await fetchText(url))
  const prefix = `${new URL(url).pathname}/`
  const slugs = $(NAV_LINK_SELECTOR)
    .map((_, link) => link.attribs.href)
    .get()
    .filter((href) => href.startsWith(prefix))
    .map((href) => href.slice(prefix.length))
    .filter((slug) => !ignore.includes(slug))
    .map((slug) => rename[slug] ?? slug)
  if (slugs.length === 0) {
    throw new Error(`No pages found in ${url} sidebar`)
  }

  return [{ file, url }, ...[...new Set(slugs)].map((slug) => ({ file: `${dir}/${slug}.md`, url: `${url}/${slug}` }))]
}

const forEachConcurrently = async <Item>(items: Item[], task: (item: Item) => Promise<void>) => {
  const queue = items.values()
  const worker = async () => {
    for (const item of queue) {
      // oxlint-disable-next-line no-await-in-loop -- each worker handles its items one after the other
      await task(item)
    }
  }
  await Promise.all(Array.from({ length: CONCURRENCY }, worker))
}

const sectionsPages = await Promise.all(SECTIONS.map((section) => getPages(section)))
const pages = sectionsPages.flat()
const snapshots = new Map<string, string>()
const errors: unknown[] = []

// The Markdown version of a page has neither CSS noise nor the double-escaped entities of the HTML code highlighting
await forEachConcurrently(pages, async ({ url, file }) => {
  try {
    snapshots.set(file, await fetchText(`${url}.md.txt`))
  } catch (error) {
    errors.push(error)
  }
})

if (errors.length > 0) {
  for (const error of errors) {
    console.error(error)
  }
  console.error(`${errors.length}/${pages.length} pages failed, snapshots left untouched`)
  process.exit(1)
}

// Only replace snapshots once every page succeeded, so a failed request never deletes one
for (const dir of SNAPSHOTS_DIRS) {
  fs.rmSync(dir, { force: true, recursive: true })
}
for (const [file, content] of snapshots) {
  fs.mkdirSync(path.dirname(file), { recursive: true })
  fs.writeFileSync(file, content)
}
console.log(`${snapshots.size} snapshots saved`)
