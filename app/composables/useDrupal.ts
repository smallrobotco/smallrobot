/**
 * Data access for the Drupal JSON:API backend at api.smallrobot.co.
 *
 * Replaces the Ember store, adapters and serializers. The include paths below were
 * verified against the live API — see docs/API-SCHEMA.md for the actual resource
 * shapes, which differ from what the old Ember models declared in several places.
 */
import { many, one, type Resource } from '~/utils/jsonapi'

/**
 * Everything needed to render a page, in one request.
 *
 * `column.element` is *polymorphic* — it resolves to concrete `text` / `image` /
 * `slideshow` / `listing` resources, not to a single `element` type. The old Ember
 * `element` model declared `texts`/`images`/`listings`/`slideshows` hasMany
 * relationships that do not exist on the API at all; including them returns HTTP 400.
 *
 * Drupal tolerates include paths whose trailing field only exists on *some* of the
 * possible target types (`.element.image` is valid only on `image`, `.element.slide`
 * only on `slideshow`), which is what lets this be a single round trip.
 */
const PAGE_INCLUDE = [
  'section',
  'section.backgroundImage',
  'section.column',
  'section.column.element',
  'section.column.element.image',
  'section.column.element.slide',
  'section.column.element.slide.image',
].join(',')

const ARTICLE_INCLUDE = ['bio', 'bio.photo'].join(',')

function apiUrl(path: string, query: Record<string, string> = {}): string {
  const { apiBase } = useRuntimeConfig().public
  const url = new URL(`${apiBase}/${path.replace(/^\/+/, '')}`)
  for (const [k, v] of Object.entries(query)) url.searchParams.set(k, v)
  return url.toString()
}

async function get(path: string, query: Record<string, string> = {}) {
  return await $fetch<Parameters<typeof one>[0]>(apiUrl(path, query), {
    headers: { Accept: 'application/vnd.api+json' },
  })
}

/**
 * Absolute URL for a `file` resource.
 *
 * Was the `fullUrl` computed property on the Ember file model. `uri` is host-relative
 * (`/sites/default/files/...`), so it joins against fileBase, not apiBase.
 */
export function fileUrl(file: Resource | null | undefined): string | null {
  const uri = file?.uri
  if (typeof uri !== 'string' || !uri) return null
  const { fileBase } = useRuntimeConfig().public
  return `${fileBase}${uri.startsWith('/') ? '' : '/'}${uri}`
}

/**
 * Alt text for an image-ish resource's `image` reference.
 *
 * Drupal puts alt/title/width/height on the resource *identifier*, so it arrives in
 * the normalizer's `$meta` bag rather than on the file. The old template read
 * `element.image.alt` off the file, where it does not exist — every image on the site
 * has been rendering without alt text.
 */
export function imageAlt(resource: Resource | null | undefined, rel = 'image'): string {
  const m = resource?.$meta?.[rel]
  const alt = Array.isArray(m) ? m[0]?.alt : m?.alt
  return typeof alt === 'string' ? alt : ''
}

/**
 * The HTML string out of a Drupal long-text field.
 *
 * These arrive as `{ value, format, processed }`, not as a bare string — `body.value`
 * is what the old templates rendered through the `html-safe` helper.
 */
export function bodyHtml(resource: Resource | null | undefined, field = 'body'): string {
  const f = resource?.[field] as { value?: unknown } | string | null | undefined
  if (typeof f === 'string') return f
  return typeof f?.value === 'string' ? f.value : ''
}

/**
 * Fetch a page by its Drupal `slug` attribute (`/about`, `/contact`, ...).
 *
 * The Ember routes each hardcoded a page UUID, which meant editors could not move or
 * replace a page without a code change. The API exposes `slug`, so we filter on that
 * instead.
 */
export function usePage(slug: string) {
  return useAsyncData(
    `page:${slug}`,
    async () => {
      const doc = await get('page', {
        'filter[slug]': slug,
        include: PAGE_INCLUDE,
      })
      return one(doc)
    },
    { deep: false },
  )
}

/** All published articles, newest first. */
export function useArticles() {
  return useAsyncData(
    'articles',
    async () => {
      const doc = await get('article', {
        'filter[status]': '1',
        sort: '-created',
        include: ARTICLE_INCLUDE,
      })
      return many(doc)
    },
    { deep: false },
  )
}

/**
 * A single article by `dashedTitle`, which is what the blog URLs are built from.
 *
 * Note `dashedTitle` and Drupal's own `path.alias` disagree for every article (e.g.
 * `lack-of-interest` vs `/lack-interest`), and the `slug` attribute is null on
 * articles. The Ember app routed on `dashedTitle`, so we keep that to preserve URLs.
 */
export function useArticle(dashedTitle: string) {
  return useAsyncData(
    `article:${dashedTitle}`,
    async () => {
      const doc = await get('article', {
        'filter[dashedTitle]': dashedTitle,
        include: ARTICLE_INCLUDE,
      })
      return one(doc)
    },
    { deep: false },
  )
}

/** Raw fetchers, for build-time route generation where composables aren't available. */
export const drupal = { apiUrl, get, PAGE_INCLUDE, ARTICLE_INCLUDE }
