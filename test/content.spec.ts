/**
 * The real content/ directory, validated the way the build reads it — so `npm test`
 * catches a broken article before `npm run generate` does, with a clearer message.
 */
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it } from 'vitest'
import { buildArticles, ContentError, parseArticle } from '../server/content/parse'

const ROOT = fileURLToPath(new URL('..', import.meta.url))

function read(dir: string, ext: string) {
  const path = join(ROOT, 'content', dir)
  return Object.fromEntries(
    readdirSync(path)
      .filter((f) => f.endsWith(ext))
      .map((f) => [f.slice(0, -ext.length), readFileSync(join(path, f), 'utf8')]),
  )
}

const files = { articles: read('articles', '.md'), people: read('people', '.yml') }

describe('content/', () => {
  const articles = buildArticles(files)

  it('loads every article', () => {
    expect(articles.length).toBe(Object.keys(files.articles).length)
  })

  it('lists articles newest first, with authors resolved', () => {
    const dates = articles.map((a) => Date.parse(a.date))
    expect(dates).toEqual([...dates].sort((a, b) => b - a))
    for (const a of articles) if (a.author) expect(a.author.name).toBeTruthy()
  })

  it('only references site images that exist in public/', () => {
    const all = Object.values(files).flatMap((group) => Object.values(group)).join('\n')
    const paths = new Set([...all.matchAll(/(?<=["'\s:=(])\/img\/[^"'\s)]+/g)].map((m) => m[0]))
    for (const p of paths) expect(existsSync(join(ROOT, 'public', p)), p).toBe(true)
  })
})

const md = (front: string, body = 'Hello.') => `---\n${front}\n---\n\n${body}\n`

describe('articles', () => {
  it('renders the Markdown body', () => {
    const a = parseArticle('a', md('title: A\ndate: 2026-01-01T00:00:00Z', 'Some **bold** text.'))
    expect(a.body).toBe('<p>Some <strong>bold</strong> text.</p>\n')
  })

  it('passes HTML bodies through untouched', () => {
    const html = '<p class="lead">Hi&nbsp;there</p>\n\n<blockquote>\n<p>Quote</p>\n</blockquote>'
    expect(parseArticle('a', md('title: A\ndate: 2026-01-01T00:00:00Z', html)).body.trim()).toBe(html)
  })

  it('rejects a misspelled field, naming the file and field', () => {
    expect(() => parseArticle('a', md('title: A\ndate: 2026-01-01T00:00:00Z\nheroColour: x'))).toThrow(
      /content\/articles\/a\.md: unknown field "heroColour"/,
    )
  })

  it('rejects a file without frontmatter', () => {
    expect(() => parseArticle('a', '# Just a heading\n')).toThrow(ContentError)
  })

  it('rejects an author with no file', () => {
    const articles = { a: md('title: A\ndate: 2026-01-01T00:00:00Z\nauthor: nobody') }
    expect(() => buildArticles({ articles, people: {} })).toThrow(/author "nobody"/)
  })

  it('leaves drafts off the site', () => {
    const articles = { a: md('title: A\ndate: 2026-01-01T00:00:00Z\ndraft: true') }
    expect(buildArticles({ articles, people: {} })).toEqual([])
  })
})
