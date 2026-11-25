/** One published article, by file name: /api/articles/foo → content/articles/foo.md. */
export default defineEventHandler(async (event) => {
  const slug = getRouterParam(event, 'slug') ?? ''
  const article = (await loadArticles()).find((a) => a.slug === slug)
  if (!article) throw createError({ statusCode: 404, statusMessage: `No published content/articles/${slug}.md` })
  return article
})
