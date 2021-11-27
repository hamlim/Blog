import * as React from 'react'
import {
  Heading,
  Link,
  Box,
  Text,
  VisuallyHidden,
  List,
  ListItem,
} from '@ds-pack/components'

interface Book {
  title: string
  author: string
  url: string
  status: 'read' | 'reading' | 'to-read'
}

let books: Array<Book> = [
  {
    title: 'Rama II',
    author: 'Arthur C. Clarke',
    url: 'https://www.goodreads.com/book/show/112520.Rama_II',
    status: 'read',
  },
  {
    title: 'Rendezvous with Rama',
    author: 'Arthur C. Clarke',
    url: 'https://www.goodreads.com/book/show/112537.Rendezvous_with_Rama',
    status: 'read',
  },
  {
    title: 'Project Hail Mary',
    author: 'Andy Weir',
    url: 'https://www.goodreads.com/book/show/54493401-project-hail-mary',
    status: 'read',
  },
  {
    title: 'The Andromeda Strain',
    author: 'Michael Crichton',
    url: 'https://www.goodreads.com/book/show/7670.The_Andromeda_Strain',
    status: 'read',
  },
  {
    title: 'Dune',
    author: 'Frank Herbert',
    url: 'https://www.goodreads.com/book/show/44767458-dune',
    status: 'read',
  },
  {
    title: '2001: A Space Odyssey',
    author: 'Arthur C. Clarke',
    url: 'https://www.goodreads.com/book/show/70535.2001',
    status: 'read',
  },
  {
    title: 'On The Road',
    author: 'Jack Kerouac',
    url: 'https://www.goodreads.com/book/show/70401.On_the_Road',
    status: 'read',
  },
  {
    title: 'The Martian Chronicles',
    author: 'Ray Bradbury',
    url: 'https://www.goodreads.com/book/show/76778.The_Martian_Chronicles',
    status: 'read',
  },
  {
    title: 'Airframe',
    author: 'Michael Crichton',
    url: 'https://www.goodreads.com/book/show/7667.Airframe',
    status: 'reading',
  },
  {
    title: 'Foundation',
    author: 'Isaac Asimov',
    url: 'https://www.goodreads.com/book/show/29579.Foundation',
    status: 'to-read',
  },
]

let reading = books.filter((book) => book.status === 'reading')
let read = books.filter((book) => book.status === 'read')
let toRead = books.filter((book) => book.status === 'to-read')

export default function Projects() {
  return (
    <>
      <Heading variant="lead" is="h1">
        Bookshelf
      </Heading>
      <Text mb="$2">
        In the rare time that I find not in front of some kind of display, I
        like to read books! Here is a short collection of books I've recently
        read as well as a few books from my to read list.
      </Text>
      <Text>
        Feel free to reach out{' '}
        <Link
          is="a"
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/hamlim"
        >
          on twitter
          <VisuallyHidden is="span">(opens in new window)</VisuallyHidden>
        </Link>{' '}
        if you have book recommendations!
      </Text>
      <Heading my="$5" variant="subhead" is="h3">
        What I'm Currently Reading:
      </Heading>
      <Box my="$5">
        <List variant="base" is="ul">
          {reading.map((book, idx) => (
            <ListItem mt={idx > 0 ? '$6' : null} key={book.title}>
              <Link
                is="a"
                href={book.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {book.title}
                <VisuallyHidden is="span">(opens in new window)</VisuallyHidden>
              </Link>{' '}
              by {book.author}
            </ListItem>
          ))}
        </List>
      </Box>
      <Heading my="$5" variant="subhead" is="h3">
        Books I've Recently Read:
      </Heading>
      <Box my="$5">
        <List variant="base" is="ul">
          {read.map((book, idx) => (
            <ListItem mt={idx > 0 ? '$6' : null} key={book.title}>
              <Link
                is="a"
                href={book.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {book.title}
                <VisuallyHidden is="span">(opens in new window)</VisuallyHidden>
              </Link>{' '}
              by {book.author}
            </ListItem>
          ))}
        </List>
      </Box>
      <Heading my="$5" variant="subhead" is="h3">
        Books I Want to Read Soon:
      </Heading>
      <Box my="$5">
        <List variant="base" is="ul">
          {toRead.map((book, idx) => (
            <ListItem mt={idx > 0 ? '$6' : null} key={book.title}>
              <Link
                is="a"
                href={book.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {book.title}
                <VisuallyHidden is="span">(opens in new window)</VisuallyHidden>
              </Link>{' '}
              by {book.author}
            </ListItem>
          ))}
        </List>
      </Box>
      <Text is="small" color="$gray-8">
        Last Updated: November 2021
      </Text>
    </>
  )
}
