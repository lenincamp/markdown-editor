import React from 'react'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import { defaultSchema } from 'hast-util-sanitize'
import remarkGfm from 'remark-gfm'
import 'github-markdown-css/github-markdown.css'
import remarkReact from 'remark-react'

import RemarkCode from '../remark-code'
import './preview.css'

interface Props {
  doc: string
}

const schema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    code: [...(defaultSchema.attributes?.code || []), 'className']
  }
}

const Preview: React.FC<Props> = props => {
  const md = unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkReact, {
      createElement: React.createElement,
      sanitize: schema,
      remarkReactComponents: {
        code: RemarkCode
      },
      Fragment: React.Fragment
    })
    .processSync(props.doc).result

  return <div className="preview markdown-body">{md}</div>
}

export default Preview
