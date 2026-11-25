/**
 * Content file text → validated blog content.
 *
 * Pure (no Nitro, no filesystem) so the build and the test suite share one definition of
 * "valid content". Strict on purpose: an unknown frontmatter field is almost always a
 * typo (`heroColour:`) that would otherwise be silently ignored, so it fails the build
 * and names the file and field instead.
 */
import { Marked } from 'marked'
import { parse } from 'yaml'
import type { Article, Person } from '../../shared/types/content'

export class ContentError extends Error {}

type Kind = 'string' | 'boolean'

/** Check a YAML mapping against a field → kind table. Empty values (`key:`) count as absent. */
function fields(value: unknown, where: string, shape: Record<string, Kind>, required: string[] = []) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    throw new ContentError(`${where}: expected a mapping of fields`)
  }
  const out: Record<string, unknown> = {}
  for (const [k, v] of Object.entries(value)) {
    const kind = shape[k]
    if (!kind) throw new ContentError(`${where}: unknown field "${k}" (allowed: ${Object.keys(shape).join(', ')})`)
    if (v === null || v === '') continue
    if (typeof v !== kind) {
      throw new ContentError(`${where}: "${k}" should be a ${kind}, got ${JSON.stringify(v).slice(0, 40)}`)
    }
    out[k] = v
  }
  for (const k of required) {
    if (!(k in out)) throw new ContentError(`${where}: missing required field "${k}"`)
  }
  return out
}

const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/

function yaml(text: string, file: string) {
  try {
    return parse(text)
  } catch (e) {
    throw new ContentError(`${file}: ${(e as Error).message}`)
  }
}

function checkSlug(slug: string, file: string) {
  if (!SLUG.test(slug)) throw new ContentError(`${file}: file names are URLs, so lowercase letters, digits and dashes only`)
}

export function parsePerson(slug: string, text: string): Person {
  const file = `content/people/${slug}.yml`
  checkSlug(slug, file)
  const p = fields(
    yaml(text, file),
    file,
    { name: 'string', professionalTitle: 'string', photo: 'string', bio: 'string', twitter: 'string', linkedin: 'string' },
    ['name'],
  )
  return { ...p, slug } as Person
}

/**
 * A fresh instance rather than the global `marked`, so nothing else can reconfigure it.
 * Defaults are GitHub-flavoured Markdown; raw HTML passes through untouched, which is
 * what the older articles (written as HTML in the CMS) rely on.
 */
const markdown = new Marked()

/** An article with its author still a slug; buildContent resolves it. */
type RawArticle = Omit<Article, 'author'> & { author?: string }

const FRONTMATTER = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/

export function parseArticle(slug: string, text: string): RawArticle {
  const file = `content/articles/${slug}.md`
  checkSlug(slug, file)
  const match = FRONTMATTER.exec(text.replace(/\r\n?/g, '\n'))
  if (!match) throw new ContentError(`${file}: should start with a --- fenced block of fields (title, date, ...)`)
  const a = fields(
    yaml(match[1]!, file),
    file,
    {
      title: 'string',
      date: 'string',
      draft: 'boolean',
      author: 'string',
      navColor: 'string',
      heroBackgroundUrl: 'string',
      heroColor: 'string',
      heroLayout: 'string',
      heroOverlay: 'string',
    },
    ['title', 'date'],
  )
  if (Number.isNaN(Date.parse(a.date as string))) {
    throw new ContentError(`${file}: date should be ISO 8601, e.g. 2026-11-23T09:00:00-08:00`)
  }
  const body = match[2]!.trim()
  if (!body) throw new ContentError(`${file}: has no body below the fields`)
  return { ...a, slug, body: markdown.parse(body, { async: false }) } as RawArticle
}

type Files = Record<string, string>

/** Every content file, by slug → published articles, newest first, authors resolved. */
export function buildArticles(files: { articles: Files; people: Files }): Article[] {
  const people = Object.fromEntries(Object.entries(files.people).map(([slug, t]) => [slug, parsePerson(slug, t)]))

  return Object.entries(files.articles)
    .map(([slug, t]) => {
      const { author, ...a } = parseArticle(slug, t)
      if (author && !people[author]) {
        throw new ContentError(`content/articles/${slug}.md: author "${author}" has no content/people/${author}.yml`)
      }
      return { ...a, ...(author ? { author: people[author] } : {}) }
    })
    .filter((a) => !a.draft)
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date))
}
