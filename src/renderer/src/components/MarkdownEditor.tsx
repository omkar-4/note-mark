import {
  headingsPlugin,
  listsPlugin,
  markdownShortcutPlugin,
  MDXEditor,
  MDXEditorMethods,
  quotePlugin,
  thematicBreakPlugin
} from '@mdxeditor/editor'
import React from 'react'

import '@mdxeditor/editor/style.css'
import '@renderer/assets/custom-theme.css'

const calculateLineNumbers = (text: string) => {
  return text.split('\n').filter((line) => line.trim() !== '').length || 1
}

// const handleInput = () => {
// if (ref.current) {
// const markdown = ref.current.getMarkdown()
// if (markdown.includes('')) {
//   const updatedMarkdown = markdown.replace('', '')
//   ref.current.setMarkdown(updatedMarkdown) // Update the markdown
// }
// }
// }

const md_template =
  '## Heading 2 \n paragraph \n > blockquote \n \nOrdered-List \n 1. First item \n 2. Second item \n 3. Third item \n\n Unordered List \n - First item \n - Second item \n - Third item'

export const MarkdownEditor = () => {
  const [lineNumbers, setLineNumbers] = React.useState<number>(1)
  const [lineNumber, setLineNumber] = React.useState<number>(1)
  const [currentLineNumber, setCurrentLineNumber] = React.useState<number>(1)
  const [content, setContent] = React.useState<string>('')
  const ref = React.useRef<MDXEditorMethods | null>(null)

  React.useEffect(() => {
    const numberOfLines = calculateLineNumbers(content)
    setLineNumbers(numberOfLines)
  }, [content])

  // const getCurrentLineNumber = () => {
  //   if (ref.current) {
  //     const markdown = ref.current.getMarkdown()
  //     const selection = window.getSelection()
  //     if (selection?.focusNode) {
  //       const focusNode = selection.focusNode.textContent // Get the current text content
  //       const focusOffset = selection.focusOffset // Get the current cursor position

  //       if (focusNode) {
  //         // Get the text before the cursor position
  //         const textBeforeCursor = focusNode.slice(0, focusOffset)
  //         // Count the number of new lines to determine the current line number
  //         const currentLine = (textBeforeCursor.match(/\n/g) || []).length + 1
  //         setLineNumber(currentLine) // Update the line number state
  //       }
  //     }
  //   }
  // }

  // const handleInput = () => {
  //   getCurrentLineNumber() // Call the function on input
  // }

  // React.useEffect(() => {
  //   handleInput()
  //   getCurrentLineNumber()
  // }, [content])

  return (
    <>
      <header className="flex flex-row items-center justify-start gap-4 flex-wrap">
        <button
          className="border hover:border-transparent hover:bg-[#F57F00] active:bg-[#9c5101] rounded-full px-3 py-0.5"
          onClick={() => ref.current?.setMarkdown(md_template)}
        >
          Start with Template
        </button>
        <button
          className="border hover:border-transparent hover:bg-[#F57F00] active:bg-[#9c5101] rounded-full px-3 py-0.5"
          onClick={() => {
            let data = ref.current?.getMarkdown()
            console.log(data)
          }}
        >
          Extract to Console
        </button>
        <span>{lineNumbers}</span>
        {/* <p>Current Line: {lineNumber}</p> */}
      </header>

      <MDXEditor
        onChange={(md) => {
          setContent(md)
          // handleInput()
          console.log(md)
          console.log(window.getSelection()?.focusNode?.textContent)

          console.log(
            window
              .getSelection()
              ?.focusNode?.textContent?.slice(0, window.getSelection()?.focusOffset)
          )

          console.log(md.slice(0, window.getSelection()?.focusOffset))

          console.log(window.getSelection()?.focusOffset)
        }}
        ref={ref}
        className="h-full w-full dark-theme dark-editor scrollbar-custom overflow-y-auto text-wrap tracking-wide min-h-"
        markdown={''}
        contentEditableClassName="outline-none min-h-svh max-w-none text-lg px-8 py-5 caret-zinc-100 prose prose-invert prose-p:my-3 prose-headings:tracking-wider prose-p:leading-normal prose-headings:my-4 prose-bockquote:my-4 prose-ul:my-2 prose-li:my-0 prose-code:px-1 prose-code:text-green-500 prose-code:before:content-[''] prose-code:after:content-['']"
        plugins={[
          headingsPlugin(),
          listsPlugin(),
          quotePlugin(),
          markdownShortcutPlugin(),
          thematicBreakPlugin()
        ]}
      />
    </>
  )
}
