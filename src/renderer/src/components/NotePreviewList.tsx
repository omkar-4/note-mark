import { NotePreview } from '@/components'
import { useNotesList } from '@/hooks/useNotesList'
import { isEmpty } from 'lodash'
import { ComponentProps } from 'react'
import { LuFileSignature } from 'react-icons/lu'
import { twMerge } from 'tailwind-merge'

export type NotePreviewListProps = ComponentProps<'ul'> & {
  onSelect?: () => void
}

export const NotePreviewList = ({ onSelect, className, ...props }: ComponentProps<'ul'>) => {
  const { notes, selectedNoteIndex, handleNoteSelect } = useNotesList({
    onSelect: () => {}
  })

  if (!notes) return null

  // if (notesMock.length === 0) {
  if (isEmpty(notes)) {
    return (
      <ul className={twMerge('text-center pt-4 ', className)}>
        <span className="text-wrap">
          No Notes Yet!
          <br />
          <br />
          Click <LuFileSignature className="inline-block w-4 h-4 text-[#f2f2f2]" /> to
          <br />
          create new note
        </span>
      </ul>
    )
  }

  return (
    <ul {...props} className={twMerge('flex flex-col gap-1', className)}>
      {/* {notesMock.map((note) => ( */}
      {notes.map((note, index) => (
        // <li key={note.title}>{note.title}</li>
        <NotePreview
          key={note.title + note.lastEditTime}
          isActive={selectedNoteIndex === index}
          onClick={handleNoteSelect(index)}
          {...note}
        />
      ))}
    </ul>
  )
}
