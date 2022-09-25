import React, { useCallback, useEffect } from 'react'
import useCodeMirror from '../../use-codemirror'
import './editor.css'

interface Props {
  initialDoc: string
  onChange: any
}

const Editor: React.FC<Props> = props => {
  const { onChange, initialDoc } = props

  const [refContainer, editorView] = useCodeMirror<HTMLDivElement>({ initialDoc, onChange })
  useEffect(() => {
    if (editorView) {
      //do nothing for now
    }
  }, [editorView])
  return (
    <div
      className="editor-wrapper"
      ref={refContainer}
    ></div>
  )
}
export default Editor
