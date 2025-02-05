type Id = number
type Tag = string
type Status = 'draft' | 'public' | 'preview'
type Month =
  | 'january'
  | 'february'
  | 'march'
  | 'april'
  | 'may'
  | 'june'
  | 'july'
  | 'august'
  | 'september'
  | 'october'
  | 'november'
  | 'december'

export interface Post {
  id: Id
  uuid: string
  /**
   * Title of the post
   */
  title: string
  /**
   * Path to the post in the public filesystem
   *
   * Relative to `./public`
   * Usually should start with `/` and end with `.md`
   */
  path: string
  /**
   * The url slug for the post
   *
   * Should roughly map to:
   * https://matthamlin.me/<year>/<month>/<slug>
   */
  slug: string
  /**
   * A date formatted as a string
   *
   * Usually formatted as "<Month> <date>(st|nd|rd|th), <year>"
   */
  date: string
  /**
   * A time formatted as a string
   *
   * Usually formatted as "<hh>:<mm>:<ss> (AM|PM)"
   */
  time: string
  /**
   * An array of tags associated to the content
   */
  tags: Array<Tag>
  /**
   * The status of the post
   */
  status: Status
  /**
   * The month the blog post was published within
   */
  month: Month
  /**
   * The year the blog post was published within
   */
  year: string
  /**
   * A short description of the post
   */
  description?: string
  /**
   * The date the post was published, in ISO format
   */
  publishedDate: string
}

export interface Manifest {
  gallery: Array<Id>
  posts: Array<Post>
  notebookEntries: Array<Post>
}

// Bookshelf:
export interface Book {
  title: string
  author: string
  url: string
  status: 'read' | 'reading' | 'to-read'
  dateStarted?: string
  dateFinished?: string
}
