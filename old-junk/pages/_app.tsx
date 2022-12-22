import { useMemo, useEffect } from 'react'
import * as comps from '@ds-pack/components'
import { MDXProvider } from '@mdx-js/react'
import { allPosts as posts } from '../posts'
// this data is collected at build time
import notebook from /* preval */ '../scripts/collect-notebook-entries'
import Head from 'next/head'
import Router from 'next/router'
import recordPageVisit from '../components/record-page'
import Link from '../components/Link'
import Code from '../components/Code'
import { Footnote, Ref } from '../components/Footnotes'
import Image from 'next/image'
import TwitterButton from '../components/TwitterButton'
import Mentions from '../components/TwitterMentions'
// Global Styles
import '../src/global.css'

let { Box, Heading, Text, Image: Img, Stack } = comps

function Time(props) {
  return <Text is="time" {...props} />
}

let components = {
  ...comps,
  Link,
  ExternalLink: (props: any) => (
    <comps.Link {...props} is="a" target="_blank" rel="noopener" />
  ),
  a: (props: any) => (
    <comps.Link {...props} is="a" target="_blank" rel="noopener" />
  ),
  p: (props: any) => <comps.Text fontSize="$2" mt="$6" {...props} />,
  h2: (props: any) => <Heading variant="h2" is="h2" mt="$6" {...props} />,
  h3: (props: any) => <Heading variant="h3" is="h3" mt="$6" {...props} />,
  h4: (props: any) => <Heading variant="subhead" is="h4" mt="$6" {...props} />,
  ul: (props: any) => (
    <Box mt="$6">
      <comps.List variant="unordered" is="ul" {...props} />
    </Box>
  ),
  li: (props: any) => <comps.ListItem fontSize="$2" mt="$2" {...props} />,
  ol: (props: any) => (
    <Box mt="$6">
      <comps.List variant="ordered" is="ol" {...props} />
    </Box>
  ),
  'li.ul': (props: any) => (
    <Box mt="$2" ml="$4">
      <comps.List variant="unordered" is="ul" {...props} />
    </Box>
  ),
  'li.ol': (props: any) => (
    <Box mt="$2" ml="$4">
      <comps.List variant="ordered" is="ol" {...props} />
    </Box>
  ),
  pre({ children }) {
    return <>{children}</>
  },
  inlineCode: comps.InlineCode,
  code: Code,
  img: Img,
  Spacer: (props: any) => <Box mb="$6" {...props} />,
  blockquote: comps.Blockquote,
  Fig: comps.Figure,
  Image(props) {
    return (
      <Box mt="$6">
        <Image
          sizes="
        94vw
        (min-width: 40em) 80vw
        (min-width: 80em) 70ch
      "
          {...props}
        />
      </Box>
    )
  },
  Figure({ src, alt, caption, width, height, layout, ...props }) {
    return (
      <Box is="figure" mt="$4">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          layout={layout}
          sizes="
          94vw
          (min-width: 40em) 80vw
          (min-width: 80em) 70ch
        "
          {...props}
        />
        <Box
          is="figcaption"
          color="$gray700"
          px="$4"
          mt="$4"
          borderLeftStyle="solid"
          borderLeftWidth="$4"
          borderLeftColor="$gray400"
        >
          {caption}
        </Box>
      </Box>
    )
  },
  Time,
  TwitterButton,
  Mentions,
  Footnote,
  Ref,
  Tweet(props) {
    return (
      <Box my="$6">
        <blockquote className="twitter-tweet tw-align-center" {...props} />
      </Box>
    )
  },
  TLDR(props: { children: React.ReactNode }) {
    return (
      <Box
        is="details"
        p="$2"
        borderStyle="solid"
        borderWidth="2px"
        borderColor="$green600"
        mt="$4"
        {...props}
      >
        <summary>
          <Text is="strong" fontWeight="bold">
            TL;DR:
          </Text>
        </summary>
        {props.children}
      </Box>
    )
  },
}

function PostLayout({ children, post }) {
  return (
    <>
      <Head>
        <script src="https://platform.twitter.com/widgets.js" />
      </Head>
      <MDXProvider components={components}>
        <Heading variant="lead" is="h1">
          {post.title}
        </Heading>
        {post.date ? (
          <>
            <Text is="span" color="$gray800" fontStyle="italic">
              Published <Time>{post.date}</Time>
            </Text>{' '}
          </>
        ) : null}
        <Mentions />
        {children}
        {post.tags ? (
          <Box mt="$3">
            <Heading variant="subhead" is="h4">
              Tags:
            </Heading>
            <Stack inline gap="$4">
              {post.tags.map((tag: string, index: number) => (
                <Box key={tag}>
                  <Box color="primary" is="span">
                    {tag}
                  </Box>
                  {index < post.tags.length - 1 ? ', ' : null}
                </Box>
              ))}
            </Stack>
          </Box>
        ) : null}
      </MDXProvider>
    </>
  )
}

function Layout({ children, title = "Matt Hamlin's Blog" }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <title>{title}</title>
      </Head>
      <Box is="main" display="flex" flexDirection="column" minHeight="100vh">
        <Box flexShrink="1" is="nav" backgroundColor="$gray000" color="black">
          <Box
            is="nav"
            maxWidth={{ small: '94vw', medium: '80vw', large: '70ch' }}
            minWidth={{ small: '94vw', medium: '80vw', large: '70ch' }}
            p="$4"
            m="0 auto"
            display="flex"
            flexDirection={{ small: 'column', large: 'row' }}
            justifyContent="space-between"
            alignItems="center"
          >
            <Box display="flex" alignItems="center">
              <Link to="/" display="flex" alignItems="center">
                <Text mr="$2" is="span" aria-label="Home" role="img">
                  🏡
                </Text>{' '}
                Home
              </Link>
              <Box id="breadcrumbs-portal" />
            </Box>
            <Box>
              <Link to="/blog">📝 Blog</Link>{' '}
              <Link to="/projects">🧪 Projects</Link>{' '}
              <Link to="/bookshelf">📚 Bookshelf</Link>{' '}
              <Link to="/social">🗣 Social</Link>
            </Box>
          </Box>
        </Box>
        <Box
          maxWidth={{ small: '94vw', medium: '80vw', large: '70ch' }}
          minWidth={{ small: '94vw', medium: '80vw', large: '70ch' }}
          p={{ small: '$3', medium: '$7', large: '$10' }}
          m="0 auto"
          flexGrow="1"
        >
          {children}
        </Box>
        <Box flexShrink="1" backgroundColor="$gray000" is="footer">
          <Box
            maxWidth={{ small: '94vw', medium: '80vw', large: '70ch' }}
            minWidth={{ small: '94vw', medium: '80vw', large: '70ch' }}
            p="$4"
            m="0 auto"
            display="flex"
            flexDirection={{ _: 'column', large: 'row' }}
            justifyContent="space-between"
            alignItems="center"
          >
            <Text>Matt Hamlin - {new Date().getFullYear()}</Text>
            <Text>
              🐦 <comps.TwitterMention>immatthamlin</comps.TwitterMention> 👨‍💻{' '}
              <comps.GitHubMention>hamlim</comps.GitHubMention>
            </Text>
          </Box>
        </Box>
      </Box>
    </>
  )
}

let hasAddedListener = false

if (!hasAddedListener) {
  Router.events.on('routeChangeComplete', () => {
    recordPageVisit()
  })
  hasAddedListener = true
}

export default function MyApp({ Component, pageProps, router }) {
  let { pathname } = router

  useEffect(() => {
    recordPageVisit()
  }, [])

  let post = useMemo(() => {
    let isBlogPost = pathname.startsWith('/posts/')
    if (!isBlogPost) {
      return undefined
    }
    let post = posts.find((post) => post.absolute === pathname) || {}
    return { ...post, ...(Component.frontMatter || {}) }
  }, [pathname])

  let notebookEntry = useMemo(() => {
    let isNotebookEntry = pathname.startsWith('/notebook/')
    if (!isNotebookEntry) {
      return undefined
    }
    let entry = notebook.find((entry) => entry.link === pathname)
    return { ...entry, ...(Component.frontMatter || {}) }
  }, [pathname])

  if (post) {
    return (
      <Layout title={post?.title}>
        <PostLayout post={post}>
          <Component {...pageProps} />
          <Box mb="$6" />
          <Box mb="$6" />
          <div>
            <TwitterButton />
          </div>
        </PostLayout>
      </Layout>
    )
  } else if (notebookEntry) {
    return (
      <Layout title={notebookEntry?.title}>
        <PostLayout post={notebookEntry}>
          <Component {...pageProps} />
        </PostLayout>
      </Layout>
    )
  }

  let title

  if (pathname.includes('/projects')) {
    title = 'Projects'
  } else if (pathname.includes('/tools')) {
    title = 'Tools'
  } else if (pathname.includes('/social')) {
    title = 'Social'
  } else if (pathname.includes('/colors')) {
    title = 'Colors'
  } else if (pathname.includes('/bookshelf')) {
    title = 'Bookshelf'
  }

  return (
    <Layout title={title}>
      <Component {...pageProps} />
    </Layout>
  )
}