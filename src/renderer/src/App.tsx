import {
  Content,
  DraggableTopBar,
  FloatingNoteTitle,
  MarkdownEditor,
  NotePreviewList,
  RootLayout,
  Sidebar
} from '@/components'
import '@renderer/assets/custom-theme.css'
import { useRef } from 'react'
import { ActionButtonsRow } from './components/ActionButtonsRow'

const App = () => {
  const contentContainerRef = useRef<HTMLDivElement>(null)
  const resetScroll = () => {
    contentContainerRef.current?.scrollTo({ left: 0, top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <DraggableTopBar />
      <RootLayout className=" flex gap-2 pt-8 pr-4 pb-4 min-w-fit">
        <Sidebar className="resize-x absolute hidden h-full w-full sm:w-fit sm:block sm:static p-2 rounded-md bg-[#151515] sm:bg-transparent scrollbar-custom">
          <ActionButtonsRow className="flex justify-between mt-1 mb-1" />
          <NotePreviewList className="" onSelect={resetScroll} />
        </Sidebar>
        <Content
          ref={contentContainerRef}
          className="ml-4 sm:ml-0 py-2 min-w-fit w-full h-full rounded-lg flex flex-col bg-[#262626] overflow-hidden"
        >
          <FloatingNoteTitle className="py-1" />
          <MarkdownEditor />
        </Content>
      </RootLayout>
    </>
  )
}

export default App
