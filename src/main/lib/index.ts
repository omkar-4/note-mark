import { appDirectoryName, fileEncoding, welcomeNote } from '@shared/constants'

import { NoteInfo } from '@shared/models'

import { CreateNote, DeleteNote, GetNotes, ReadNote, WriteNote } from '@shared/types'
import { dialog } from 'electron'

import { ensureDir, readdir, readFile, remove, stat, writeFile } from 'fs-extra'

import { isEmpty } from 'lodash'
import { homedir } from 'os'
import path from 'path'
import welcomeNoteFile from '../../../resources/welcomeNote.md?asset'

/**
 * retrieves root dir path for the app's documents
 *
 * @returns (string) path to the root directory,
 *    constructed from {home-dir + ./. + app-dir name}
 */

export const getRootDir = () => {
  return `${homedir()}/Documents/${appDirectoryName}`
}

/**
 * asynchronously retieves an [array] of note-info from specified root directory
 *
 * Function ensures if root directory exists, reads the files in it, filters files with .md extension
 *
 * @returns Promise that resolves to an array of 'NoteInfo' Object
 */

export const getNotes: GetNotes = async () => {
  const rootDir = getRootDir()
  // console.log(`log1: rootDir: ${rootDir}`)

  // try {
  await ensureDir(rootDir)
  //   console.log(`log2: rootDir exists`)
  // } catch (error) {
  //   console.error(`log2: failed to ensure directory ${error}`)
  //   throw error
  // }

  const notesFileNames = await readdir(rootDir, { encoding: fileEncoding, withFileTypes: false })
  // console.log(`log3: notesFileNames: ${notesFileNames}`)

  const notes = notesFileNames.filter((fileName) => fileName.endsWith('.md'))

  if (isEmpty(notes)) {
    console.info('No notes found, creating a welcome note')

    const content = await readFile(welcomeNoteFile, { encoding: fileEncoding })

    await writeFile(`${rootDir}/${welcomeNote}`, content, { encoding: fileEncoding })

    notes.push(welcomeNote)
  }
  // console.log(`log4: notes: ${notes}`)

  // console.log(`notes-map: ${notes.map(getNoteInfoFromFilename)}`);

  // console.log(
  //  Promise.all(notes.map(getNoteInfoFromFilename))
  // )
  // Promise {<pending>}

  // console.log(getNoteInfoFromFilename);
  // console.log(getNoteInfoFromFilename("test.md"));

  return Promise.all(notes.map(getNoteInfoFromFilename))
}

/**
 * Asynchronously retrieves note information from a given filename.
 *
 * This function extracts the title by removing the '.md' extension
 * and retrieves the last modification time of the file.
 *
 * @param filename - The name of the note file, expected to have a '.md' extension.
 *
 * @returns A Promise that resolves to a `NoteInfo` object containing:
 *    - (string) `title`: The title of the note derived from the filename.
 *    - (number) `lastEditTime`: The last modification time of the file in milliseconds.
 *
 * @throws An error if the file statistics cannot be retrieved.
 */

export const getNoteInfoFromFilename = async (filename: string): Promise<NoteInfo> => {
  const fileStats = await stat(`${getRootDir()}/${filename}`)

  return {
    title: filename.replace(/\.md$/, ''),
    lastEditTime: fileStats.mtimeMs
  }
}

export const readNote: ReadNote = async (filename) => {
  const rootDir = getRootDir()

  return readFile(`${rootDir}/${filename}.md`, { encoding: fileEncoding })
}

export const writeNote: WriteNote = async (filename, content) => {
  const rootDir = getRootDir()

  console.info(`Writing note ${filename}`)
  return writeFile(`${rootDir}/${filename}.md`, content, { encoding: fileEncoding })
}

export const createNote: CreateNote = async () => {
  const rootDir = getRootDir()
  await ensureDir(rootDir)
  console.log(`rootDir: ${rootDir}`)

  const { filePath, canceled } = await dialog.showSaveDialog({
    title: 'New Note',
    defaultPath: `${rootDir}/Untitled.md`,
    buttonLabel: 'Create',
    properties: ['showOverwriteConfirmation'],
    showsTagField: false,
    filters: [{ name: 'Markdown', extensions: ['md'] }]
  })

  if (canceled || !filePath) {
    console.log('Note creation canceled')
    return false
  }

  const { name: filename, dir: parentDir } = path.parse(filePath)

  const normalizedRootDir = path.normalize(path.resolve(rootDir))
  const normalizedParentDir = path.normalize(path.resolve(parentDir))

  console.log(`Normalized Root Directory: ${normalizedRootDir}`)
  console.log(`Normalized Parent Directory: ${normalizedParentDir}`)

  if (normalizedParentDir !== normalizedRootDir) {
    await dialog.showMessageBox({
      type: 'error',
      title: 'Creation failed',
      message: 'All notes must be saved under root directory, avoid using other directories'
    })

    return false
  }
  console.info(`New note creating at: ${filePath}`)
  await writeFile(filePath, '')

  return filename
}

export const deleteNote: DeleteNote = async (filename) => {
  const rootDir = getRootDir()

  const { response } = await dialog.showMessageBox({
    type: 'warning',
    title: 'Delete Note',
    message: `Are you sure you want to delete "${filename}"?`,
    buttons: ['Delete', 'Cancel'], // 0 delete 1 cancel
    defaultId: 1,
    cancelId: 2,
    noLink: true
  })

  if (response === 1) {
    console.info('Note deletion canceled')
    return false
  }

  console.info(`Deleting Note: ${filename}`)
  await remove(`${rootDir}/${filename}.md`)
  return true
}
