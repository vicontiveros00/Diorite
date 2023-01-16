import { Button, Col, Row } from "react-bootstrap";
import { NewNoteProps } from "../util/types"
import NoteForm from "./NoteForm"


const NewNote = ({ onSubmit, onAddTag, existingTags }: NewNoteProps) => {
    return (
        <>
            <Row className="align-items-center mb-4">
                <Col>
                    <h1>New Diorite</h1>
                </Col>
                <Col xs='auto'>
                    <a target='_blank' rel="noreferrer" href='https://www.markdownguide.org/basic-syntax/'>
                        <Button variant="primary">Markdown Syntax</Button>
                    </a>
                </Col>
            </Row>
            <NoteForm
                onSubmit={onSubmit}
                onAddTag={onAddTag}
                existingTags={existingTags} />
        </>
    )
}

export default NewNote;