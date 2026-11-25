/**
 * Blog articles, from content/ via the server routes in server/api/.
 *
 * The site is prerendered, so these run at build time; each route's data is written into
 * its _payload.json and client-side navigation reads that, never the API.
 */
import type { Ref } from 'vue'
import type { Article } from '#shared/types/content'

/**
 * Fetch content that must exist. A missing or invalid file throws instead of rendering an
 * empty page, so it fails `npm run generate` (or shows Nuxt's error page in dev) rather
 * than shipping a blank route.
 */
async function required<T>(key: string, url: string): Promise<Ref<T>> {
  const { data, error } = await useFetch<T>(url, { key, deep: false })
  if (data.value == null) {
    throw createError({
      statusCode: error.value?.statusCode ?? 500,
      statusMessage: error.value?.statusMessage ?? `${url} returned no content`,
      fatal: true,
    })
  }
  return data as Ref<T>
}

/** Published articles, newest first. */
export const useArticles = () => required<Article[]>('articles', '/api/articles')

/** A published article by file name, which is also its URL slug under /ideas. */
export const useArticle = (slug: string) => required<Article>(`article:${slug}`, `/api/articles/${slug}`)
