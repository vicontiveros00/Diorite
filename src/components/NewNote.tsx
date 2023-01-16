import { NewNoteProps } from "../util/types"
import NoteForm from "./NoteForm"


const NewNote = ({ onSubmit, onAddTag, existingTags }: NewNoteProps) => {
    return (
        <>
            <h1 className="mb-4">New Note</h1>
            <NoteForm
                onSubmit={onSubmit}
                onAddTag={onAddTag}
                existingTags={existingTags} />
        </>
    )
}

export default NewNote;