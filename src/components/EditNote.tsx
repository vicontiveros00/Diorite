import { Button, Col, Row } from "react-bootstrap";
import { EditNoteProps } from "../util/types";
import { useCurrentNote } from "./Layout"
import NoteForm from "./NoteForm"


const EditNote = ({ onSubmit, onAddTag, existingTags }: EditNoteProps) => {
    const currentNote = useCurrentNote();
    return (
        <>
            <Row className="align-items-center mb-4">
                <Col>
                    <h1>Edit Diorite</h1>
                </Col>
                <Col xs='auto'>
                    <a target='_blank' rel="noreferrer" href='https://www.markdownguide.org/basic-syntax/'>
                        <Button variant="primary">Markdown Syntax</Button>
                    </a>
                </Col>
            </Row>
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