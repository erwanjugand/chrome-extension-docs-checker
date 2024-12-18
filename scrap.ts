import * as cheerio from 'cheerio'
import * as path from 'path'
import fs from 'node:fs'
import https from 'node:https'
const SNAPSHOTS_DIR = 'snapshots'

const BASE_URL = 'https://developer.chrome.com'
const API_URL = `${BASE_URL}/docs/extensions/reference/api`
const MAIN_SELECTOR = '.devsite-article-body'
const LINK_SELECTORS =
  ".devsite-nav-list[menu='_book'] .devsite-nav-item:not(.devsite-nav-deprecated) > a[href^='/docs/extensions/reference/api/']"

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

const getApiLinks = async (): Promise<string[]> => {
  try {
    const html = await fetch(API_URL)
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

const extractHtml = async (apiUrl: string) => {
  const apiName = apiUrl.split(`${API_URL}/`).pop() ?? ''
  const apiFileName = apiName.replaceAll('/', '.')
  const snapshotPath = path.join(`${SNAPSHOTS_DIR}/`, `${apiFileName}.html`)

  try {
    const html = await fetch(apiUrl)
    const cheerioHtml = cheerio.load(html)
    const content = cheerioHtml(MAIN_SELECTOR).html()

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

const init = async () => {
  if (fs.existsSync(SNAPSHOTS_DIR)) {
    fs.rmSync(SNAPSHOTS_DIR, { recursive: true })
  }
  fs.mkdirSync(SNAPSHOTS_DIR)

  const apiLinks = await getApiLinks()
  console.log(`${apiLinks.length} APIs found.`)

  for (const apiUrl of apiLinks) {
    extractHtml(apiUrl)
  }
}

init()
