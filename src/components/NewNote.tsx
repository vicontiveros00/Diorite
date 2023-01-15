import { NoteComponentProps } from "../App"
import NoteForm from "./NoteForm"


const NewNote = ({ onSubmit, onAddTag, existingTags }: NoteComponentProps) => {
    return (
        <>
            <h1 className="mb-4">New Note</h1>
            <NoteForm
                onSubmit={onSubmit}
                onAddTag={onAddTag}
                existingTags={existingTags}
                notes={[]}
            />
        </>
    )
}

export default NewNote