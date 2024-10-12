// DialogBox.tsx
import { dialogOpenAtom } from '@renderer/store' // Import your atom
import { useAtom } from 'jotai'
import React from 'react'

interface DialogBoxProps {
  title?: string
  message: string
  onConfirm: () => void
}

const DialogBox: React.FC<DialogBoxProps> = ({ title, message, onConfirm }) => {
  const [isOpen, setDialogOpen] = useAtom(dialogOpenAtom)

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape') {
      setDialogOpen(false)
    }
    if (event.key === 'Enter') {
      onConfirm()
      setDialogOpen(false)
    }
  }

  if (!isOpen) return null // Don't render if dialog is closed

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50"
      onKeyDown={handleKeyDown}
    >
      <div className="bg-[#262626] p-6 rounded-lg shadow-md text-center" tabIndex={0}>
        {title && <h2 className="text-lg font-bold mb-4">{title}</h2>}
        <p className="mb-4">{message}</p>
        <div className="flex justify-between">
          <button
            className="bg-gray-200 hover:bg-gray-400 text-black font-semibold py-2 px-4 rounded"
            onClick={() => setDialogOpen(false)}
          >
            Cancel
          </button>
          <button
            className="bg-red-500 hover:bg-red-800 text-white font-semibold py-2 px-4 rounded"
            onClick={() => {
              onConfirm()
              setDialogOpen(false)
            }}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  )
}

export default DialogBox
