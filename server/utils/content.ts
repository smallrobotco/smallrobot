import { buildArticles } from '../content/parse'
import type { Article } from '#shared/types/content'

/**
 * Published blog articles, newest first, read from content/ (mounted as the
 * `assets:content` server asset in nuxt.config.ts).
 *
 * Re-read on every call rather than cached: it is a handful of small files, the site is
 * prerendered so this runs once per route at build time, and in `nuxt dev` an edited file
 * shows up on the next reload. Any invalid file throws, which fails the build.
 */
export async function loadArticles(): Promise<Article[]> {
  const storage = useStorage('assets:content')

  async function read(dir: string, ext: string) {
    const keys = (await storage.getKeys(dir)).filter((k) => k.endsWith(ext))
    const entries = await Promise.all(
      keys.map(async (key) => {
        const raw = await storage.getItemRaw(key)
        const text = typeof raw === 'string' ? raw : new TextDecoder().decode(raw as Uint8Array)
        // `articles:foo.md` → `foo`
        return [key.slice(dir.length + 1, -ext.length), text] as const
      }),
    )
    return Object.fromEntries(entries)
  }

  const [articles, people] = await Promise.all([read('articles', '.md'), read('people', '.yml')])
  return buildArticles({ articles, people })
}
