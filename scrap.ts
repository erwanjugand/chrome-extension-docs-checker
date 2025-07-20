import * as cheerio from 'cheerio'
import * as path from 'path'
import fs from 'node:fs'
import https from 'node:https'

const SNAPSHOTS_DIR = 'snapshots'
const SNAPSHOTS_DIR_MV2 = 'snapshots-mv2'

const BASE_URL = 'https://developer.chrome.com'
const MV3_URL = `${BASE_URL}/docs/extensions/reference/api`
const MV2_URL = `${BASE_URL}/docs/extensions/mv2/reference`
const MAIN_SELECTOR = '.devsite-article-body'
const LINK_SELECTORS =
  ".devsite-nav-list[menu='_book'] .devsite-nav-item:not(.devsite-nav-deprecated) > a[href^='/docs/extensions/']"

function fetch(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    https
      .get(url, res => {
        let data = ''

        res.on('data', chunk => {
          data += chunk
        })

        res.on('end', () => {
          if (res.statusCode && res.statusCode >= 200 && res.statusCode < 300) {
            resolve(data)
          } else {
            reject(new Error(`HTTP ${res.statusCode}: ${res.statusMessage}`))
          }
        })
      })
      .on('error', reject)
  })
}

const getApiLinks = async (baseUrl: string): Promise<string[]> => {
  try {
    const html = await fetch(baseUrl)
    const cheerioHtml = cheerio.load(html)
    const links: string[] = []

    cheerioHtml(LINK_SELECTORS).each((_, element) => {
      const link = cheerioHtml(element).attr('href')
      if (!link) return
      links.push(`${BASE_URL}${link}`)
    })

    return links
  } catch (error) {
    console.error('Error while fetching the APIs:', error)
    return []
  }
}

const extractContent = async (apiUrl: string, dist: string, baseUrl: string) => {
  const apiName = apiUrl.split(`${baseUrl}/`).pop() ?? ''
  const apiFileName = apiName.replaceAll('/', '.')
  const snapshotPath = path.join(`${dist}/`, `${apiFileName}.html`)

  try {
    const html = await fetch(apiUrl)
    const cheerioHtml = cheerio.load(html)
    const content = cheerioHtml(MAIN_SELECTOR).text()

    if (!content) {
      console.error(`No content found for ${apiName}`)
      return
    }

    fs.writeFileSync(snapshotPath, content, 'utf-8')
    console.log(`Snapshot saved for ${apiName}`)
  } catch (error) {
    console.error(`Error while fetching ${apiUrl}:`, error)
  }
}

const init = async (dist: string, baseUrl: string) => {
  if (fs.existsSync(dist)) {
    fs.rmSync(dist, { recursive: true })
  }
  fs.mkdirSync(dist)

  const apiLinks = await getApiLinks(baseUrl)
  console.log(`${apiLinks.length} APIs found.`)

  for (const apiUrl of apiLinks) {
    extractContent(apiUrl, dist, baseUrl)
  }
}

init(SNAPSHOTS_DIR, MV3_URL)
init(SNAPSHOTS_DIR_MV2, MV2_URL)
