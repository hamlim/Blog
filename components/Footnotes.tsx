import { Text, Link, Box } from '@ui/components'
import { footnote } from './Footnotes.css'

export function Ref({ id }) {
  return (
    <Text is="sup" fontSize="$0">
      <Link id={`ref-${id}`} is="a" href={`#fn-${id}`}>
        [{id}]
      </Link>
    </Text>
  )
}

export function Footnote({ id, children }) {
  return (
    <Box id={`fn-${id}`} className={footnote}>
      <Link is="a" href={`#ref-${id}`}>
        [{id}]
      </Link>{' '}
      - {children}
    </Box>
  )
}
