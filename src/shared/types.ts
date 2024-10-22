import { NoteContent, NoteInfo } from './models'

/**
 * async retrieves an [array] of notes.
 *
 * @returns A Promise that resolves to an array of `NoteInfo` objects.
 */
export type GetNotes = () => Promise<NoteInfo[]>

/**
 * async reads a note based on given title
 *
 * @param title - Title of the note
 * @returns - Promise that resolves to the content of the note
 */
export type ReadNote = (title: NoteInfo['title']) => Promise<NoteContent>

/**
 * async writes a note with given title and content
 *
 * @param title - Title of the note
 * @param content - Content of the note
 * @returns - void ; Promise that resolves when the note is successfully written
 */
export type WriteNote = (title: NoteInfo['title'], content: NoteContent) => Promise<void>

/**
 * async creates a new note
 *
 * @returns - Promise that resolves to -
 *    - (string) object's 'title' property index = the title of the newly created note
 *    - or (boolean) `false` if creation failed
 */
export type CreateNote = () => Promise<NoteInfo['title'] | false>

/**
 * async deletes a note
 *
 * @param titleBarOverlay - Title of the note to be deleted
 * @returns - Promise that resolves to yes/no (boolean)
 */
export type DeleteNote = (TitleBarOverlay: NoteInfo['title']) => Promise<boolean>
