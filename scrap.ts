import fs from 'node:fs'
import path from 'node:path'

import * as cheerio from 'cheerio'

const SNAPSHOTS_DIR_MV3 = 'snapshots-mv3'
const SNAPSHOTS_DIR_MV2 = 'snapshots-mv2'

const BASE_URL = 'https://developer.chrome.com'
const MV3_BASE_URL = `${BASE_URL}/docs/extensions/reference`
const MV2_BASE_URL = `${BASE_URL}/docs/extensions/mv2/reference`

const MAIN_SELECTOR = '.devsite-article-body'

const extractContent = async (apiUrl: string, dist: string, baseUrl: string) => {
  const apiName = apiUrl.split(baseUrl).pop()?.replace('/', '') || 'index'
  const snapshotPath = path.join(`${dist}/`, `${apiName}.html`)
  try {
    const html = await fetch(`${apiUrl}?hl=en`).then((response) => response.text())
    const cheerioHtml = cheerio.load(html)
    const rawContent = cheerioHtml(MAIN_SELECTOR).text()
    const content = rawContent
      .replaceAll(/&(?:\s|\u00A0)*gt;/g, '> ')
      .replaceAll(/&(?:\s|\u00A0)*quot;/g, '"')
      .replaceAll(/&(?:\s|\u00A0)*#39;/g, "'")
    if (!content) {
      console.error(`No content found for ${apiName}`)
      return
    }
    fs.mkdirSync(path.dirname(snapshotPath), { recursive: true })
    fs.writeFileSync(snapshotPath, content, 'utf-8')
    console.log(`Snapshot saved in ${snapshotPath}`)
  } catch (error) {
    console.error(`Error while fetching ${apiUrl}:`, error)
  }
}

const API_LINK_SELECTORS =
  ".devsite-nav-list[menu='_book'] .devsite-nav-item:not(.devsite-nav-deprecated) > a[href^='/docs/extensions/']"

const getLinks = async (baseUrl: string, selector: string): Promise<string[]> => {
  try {
    const html = await fetch(baseUrl).then((response) => response.text())
    const cheerioHtml = cheerio.load(html)
    const links: string[] = []

    cheerioHtml(selector).each((_, element) => {
      const link = cheerioHtml(element)
      const text = link.text()
      const href = link.attr('href')
      if (!href || text.includes('➡')) return
      links.push(`${BASE_URL}${href}`)
    })

    return links
  } catch (error) {
    console.error('Error while fetching the APIs:', error)
    return []
  }
}

const scrapMV3 = async () => {
  if (fs.existsSync(SNAPSHOTS_DIR_MV3)) {
    fs.rmSync(SNAPSHOTS_DIR_MV3, { recursive: true })
  }
  fs.mkdirSync(SNAPSHOTS_DIR_MV3)
  const mainApiLink = `${MV3_BASE_URL}/api`
  const apiLinks = await getLinks(mainApiLink, API_LINK_SELECTORS)
  const mainManifestLink = `${MV3_BASE_URL}/manifest`
  const manifestLinks = await getLinks(mainManifestLink, API_LINK_SELECTORS)
  const moreLinks = [mainApiLink, mainManifestLink, `${MV3_BASE_URL}/permissions-list`]

  for (const apiLink of apiLinks.filter((link) => link !== mainApiLink).map((link) => link)) {
    extractContent(apiLink, `${SNAPSHOTS_DIR_MV3}/api`, mainApiLink)
    await new Promise((resolve) => setTimeout(resolve, 100))
  }

  for (const manifestLink of manifestLinks.filter((link) => link !== mainManifestLink)) {
    extractContent(manifestLink, `${SNAPSHOTS_DIR_MV3}/manifest`, mainManifestLink)
    await new Promise((resolve) => setTimeout(resolve, 100))
  }

  for (const moreLink of moreLinks) {
    extractContent(moreLink, SNAPSHOTS_DIR_MV3, MV3_BASE_URL)
    await new Promise((resolve) => setTimeout(resolve, 100))
  }
}

const scrapMV2 = async () => {
  if (fs.existsSync(SNAPSHOTS_DIR_MV2)) {
    fs.rmSync(SNAPSHOTS_DIR_MV2, { recursive: true })
  }
  fs.mkdirSync(SNAPSHOTS_DIR_MV2)

  const apiLinks = await getLinks(MV2_BASE_URL, API_LINK_SELECTORS)
  const moreLinks = [MV2_BASE_URL]

  for (const apiLink of apiLinks
    .filter(
      (link) => link !== MV2_BASE_URL && !link.endsWith('enterprise/login') && !link.endsWith('devtools/performance'),
    )
    .map((link) => link.replace('input/ime', 'input_ime'))) {
    extractContent(apiLink, `${SNAPSHOTS_DIR_MV2}/api`, MV2_BASE_URL)
  }

  for (const moreLink of moreLinks) {
    extractContent(moreLink, SNAPSHOTS_DIR_MV2, MV2_BASE_URL)
  }
}

scrapMV3()
scrapMV2()
