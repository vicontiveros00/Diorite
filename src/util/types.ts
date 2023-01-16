export type RawNote = {
    id: string
} & RawNoteData
  //in the event a diorite note is edited, id will remain the same even if content changes
  
export type NotePreviewProps = {
    tags: Tag[],
    title: string,
    id: string
}
  
export type RawNoteData = {
    title: string,
    markdown: string,
    tagIds: string[]
    //only takes id of each tag to keep reference if tag content changes
}
  
export type Tag = {
    id: string,
    label: string
}
  
export type NoteData = {
    title: string,
    markdown: string,
    tags: Tag[]
}
  
export type Note = {
    id: string
} & NoteData
  
  //for components that use existing tags as a prop
export type NoteListProps = {
    existingTags: Tag[],
    notes: NotePreviewProps[]
    removeTag: (id: string) => void
    updateTag: (id: string, label: string) => void
}
  
export type TagModal = {
    existingTags: Tag[]
    showTagModal: boolean
    handleClose: () => void
    removeTag: (id: string) => void
    updateTag: (id: string, label: string) => void
}
  
export type NoteFormProps = {
    onSubmit: (data: NoteData) => void
    onAddTag: (tag: Tag) => void
    tags?: Tag[]
    existingTags: Tag[]
    title?: string
    markdown?: string
}
  
export type NoteLayoutProps = {
    notes: Note[]
}
  
export type EditNoteProps = {
    onSubmit: (id: string, data: NoteData) => void
    onAddTag: (tag: Tag) => void
    existingTags: Tag[]
}
  
export type ShowNoteProps = {
    onDeleteNote: (id: string) => void
}
  
export type NewNoteProps = {
    onSubmit: (data: NoteData) => void
    onAddTag: (tag: Tag) => void
    existingTags: Tag[]
}

export type SettingsModal = {
    showSettingsModal: boolean
    handleClose: () => void
}