import { EditNoteProps } from "../util/types";
import { useCurrentNote } from "./Layout"
import NoteForm from "./NoteForm"


const EditNote = ({ onSubmit, onAddTag, existingTags }: EditNoteProps) => {
    const currentNote = useCurrentNote();
    return (
        <>
            <h1 className="mb-4">Edit Note</h1>
            <NoteForm
                title={currentNote.title}
                markdown={currentNote.markdown}
                tags={currentNote.tags}
                onSubmit={(data) => {
                    onSubmit(currentNote.id, data)
                }}
                onAddTag={onAddTag}
                existingTags={existingTags}
            />
        </>
    )
}

export default EditNote;