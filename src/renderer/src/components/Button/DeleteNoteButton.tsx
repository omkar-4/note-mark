import { ActionButton, ActionButtonProps } from '@/components'
import { deleteNoteAtom, dialogOpenAtom } from '@renderer/store'
import { useAtom, useSetAtom } from 'jotai'
import { FaRegTrashCan } from 'react-icons/fa6'
import DialogBox from '../DialogBox'

export const DeleteNoteButton = ({ ...props }: ActionButtonProps) => {
  const deleteNote = useSetAtom(deleteNoteAtom)
  const [isDialogOpen, setDialogOpen] = useAtom(dialogOpenAtom)

  const handleDelete = () => {
    deleteNote()
    setDialogOpen(false)
  }

  return (
    <>
      <ActionButton onClick={() => setDialogOpen(true)} {...props}>
        <FaRegTrashCan className="w-4 h-4 text-[#f2f2f2]" />
      </ActionButton>
      <DialogBox
        title="Confirm Deletion" // Title for the dialog
        message="Are you sure you want to delete this note?" // Custom message
        onConfirm={handleDelete} // Function to call on confirm
      />
    </>
  )
}
