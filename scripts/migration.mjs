// Temp script
// Crawl though /public/posts
// Derive dates/slugs/titles/etc and fill in the posts array in feed.json

import { execSync } from 'child_process'
import fs from 'fs'
import path from 'path'
import originalManifest from '../public/feed.json' assert { type: 'json' }

import matter from 'gray-matter'

function searchRecursive(dir, pattern) {
  // This is where we store pattern matches of all files inside the directory
  let results = []

  // Read contents of directory
  fs.readdirSync(dir).forEach(function (dirInner) {
    // Obtain absolute path
    dirInner = path.resolve(dir, dirInner)

    // Get stats to determine if path is a directory or a file
    let stat = fs.statSync(dirInner)

    // If path is a directory, scan it and combine results
    if (stat.isDirectory()) {
      results = results.concat(searchRecursive(dirInner, pattern))
    }

    // If path is a file and ends with pattern then push it onto results
    if (stat.isFile() && dirInner.endsWith(pattern)) {
      results.push(dirInner)
    }
  })

  return results
}

let mdxes = searchRecursive('./public/posts', '.md')

let postData = mdxes.map((filepath, index) => {
  let filename = filepath
    .split('/')
    [filepath.split('/').length - 1].split('.')[0]
  let title = filename
    .replace(/-/g, ' ')
    .split(' ')
    .map((hunk) => hunk[0].toUpperCase() + hunk.slice(1))
    .join(' ')

  let [_, year, month, slug] = filepath
    .split('/public/posts')[1]
    .replace('.md', '')
    .split('/')

  let fileContent = fs.readFileSync(filepath, 'utf8')

  const { data: frontMatter = {}, content } = matter(fileContent)

  return {
    id: index,
    title: frontMatter.title || title,
    path: `/posts/${filepath.split('/public/posts/')[1]}`,
    slug,
    date:
      frontMatter.date ||
      `${month
        .split(' ')
        .map((hunk) => hunk[0].toUpperCase() + hunk.slice(1))} 1st, ${year}`,
    time: frontMatter.time || `12:00:00 PM`,
    tags: frontMatter.tags || [],
    month,
    year: Number(year),
    status: frontMatter.draft ? 'draft' : 'public',
  }
})

fs.writeFileSync(
  './public/feed.json',
  JSON.stringify({
    ...originalManifest,
    posts: [...originalManifest.posts, ...postData],
  }),
)

execSync('yarn format')
