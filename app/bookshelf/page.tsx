import {
  Heading,
  Link,
  Box,
  Text,
  VisuallyHidden,
  List,
  ListItem,
} from '@ds-pack/components'
import { fetchBookshelf } from '@lib/fetch-bookshelf'

export default async function Bookshelf() {
  let { reading, read, toRead } = await fetchBookshelf()
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
      <Box my="5">
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
              {book.dateStarted ? (
                <>
                  <br />
                  <Text fontSize="$0" is="em" fontWeight="italics">
                    Started: {book.dateStarted}
                  </Text>
                </>
              ) : null}
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
              {book.dateStarted && book.dateFinished ? (
                <>
                  <br />
                  <Text fontSize="$0" is="em" fontWeight="italics">
                    {book.dateStarted} - {book.dateFinished}
                  </Text>
                </>
              ) : null}
            </ListItem>
          ))}
        </List>
      </Box>
      <Text is="small" color="$gray800">
        Last Updated: December 2022
      </Text>
    </>
  )
}

export const revalidate = 0
export const dynamic = 'force-dynamic'
