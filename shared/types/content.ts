/**
 * The blog's content model — what the files under content/ hold, after loading.
 *
 * Only articles (and their authors) are content. Landing pages are markup in app/pages.
 */

export interface Person {
  /** The file name: content/people/<slug>.yml, which articles reference. */
  slug: string
  name: string
  professionalTitle?: string
  /** Site path of a portrait, e.g. /img/content/Trent.jpg. */
  photo?: string
  /** HTML. */
  bio?: string
  twitter?: string
  linkedin?: string
}

export interface Article {
  /** The file name and URL: content/articles/<slug>.md → /ideas/<slug>. */
  slug: string
  title: string
  /** ISO 8601. Articles list newest first. */
  date: string
  /** Kept in the repo but left off the site. */
  draft?: boolean
  author?: Person
  /** `nav-light` for a light nav (and title) over a dark hero. */
  navColor?: string
  heroBackgroundUrl?: string
  /** `background-*` colour class behind the hero. */
  heroColor?: string
  /** `hero-center` or `hero-left`. */
  heroLayout?: string
  /** `overlay-*` wash over the hero image. */
  heroOverlay?: string
  /** The Markdown body, rendered to HTML. */
  body: string
}
