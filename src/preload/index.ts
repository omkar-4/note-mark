import { CreateNote, DeleteNote, GetNotes, ReadNote, WriteNote } from '@shared/types'
import { contextBridge, ipcRenderer } from 'electron'

if (!process.contextIsolated) {
  throw new Error('contextIsolation must be enabled in the BrowserWindow')
}

try {
  contextBridge.exposeInMainWorld('context', {
    // navigator is an API returning info about user-agent
    locale: navigator.language,

    getNotes: (...args: Parameters<GetNotes>) => ipcRenderer.invoke('getNotes', ...args),

    readNote: (...args: Parameters<ReadNote>) => ipcRenderer.invoke('readNote', ...args),

    writeNote: (...args: Parameters<WriteNote>) => ipcRenderer.invoke('writeNote', ...args),

    createNote: (...args: Parameters<CreateNote>) => ipcRenderer.invoke('createNote', ...args),

    deleteNote: (...args: Parameters<DeleteNote>) => ipcRenderer.invoke('deleteNote', ...args)
  })
} catch (error) {
  console.error(error)
}

try {
  contextBridge.exposeInMainWorld('electronAPI', {
    closeWindow: () => ipcRenderer.send('window-close'),
    minimizeWindow: () => ipcRenderer.send('window-minimize'),
    maximizeWindow: () => ipcRenderer.send('window-maximize')
  })
} catch (error) {
  console.error(error)
}
