import React, { useEffect, useState } from 'react'
import runmode, { getLanguage } from '../../runmode'

type Tokens = {
  text: string
  style: string | null
}[]

const RemarkCode: React.FC<
  React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
> = props => {
  const [spans, setSpans] = useState<Tokens>([])
  const { className } = props
  const langName = (className || '').substr(9)

  useEffect(() => {
    getLanguage(langName).then(language => {
      if (!language) return
      const body = props.children instanceof Array ? props.children[0] : null
      const tokens: Tokens = []
      runmode(
        body as string,
        language,
        (text: string, style: string | null, _from: number, _to: number) => {
          tokens.push({ text, style })
        }
      )
      setSpans(tokens)
    })
  }, [props.children])

  if (!spans?.length) {
    return <code>{props.children}</code>
  }
  return (
    <code>
      {spans.map((span, i) => (
        <span
          key={i}
          className={span.style || ''}
        >
          {span.text}
        </span>
      ))}
    </code>
  )
}

export default RemarkCode
