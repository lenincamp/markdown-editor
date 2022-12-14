import React, { useState, useCallback } from 'react'
import { Editor } from './components/editor'
import './app.css'
import Preview from './components/preview'

const App: React.FC = () => {
  const [doc, setDoc] = useState<string>('# Hello, World!\n')

  const handleDocChange = useCallback(newDoc => {
    console.log({ newDoc })
    setDoc(newDoc)
  }, [])

  return (
    <div className="app">
      <Editor
        onChange={handleDocChange}
        initialDoc={doc}
      />
      <Preview doc={doc} />
    </div>
  )
}

export default App
