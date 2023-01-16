import { Badge, Button, Col, Row, Stack } from "react-bootstrap";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import { Link, useNavigate } from "react-router-dom";
import { ShowNoteProps } from "../util/types";
import { useCurrentNote } from "./Layout";

const ShowNote = ({ onDeleteNote }: ShowNoteProps) => {
    const currentNote = useCurrentNote();
    const redirect = useNavigate();

    return <>
        <Row className='align-items-center mb-3'>
            <Col>
                <h1>{currentNote.title}</h1>
                {currentNote.tags.length > 0 && (
                    <Stack
                        className='flex-wrap'
                        direction='horizontal'
                        gap={1}
                    >
                   {currentNote.tags.map((tag) => {
                        return (
                           <Badge className='text-truncate' key={tag.id}>{tag.label}</Badge>
                        )
                    })}
                    </Stack> 
                )}
            </Col>
            <Col xs="auto">
                <Stack direction={"horizontal"} gap={2}>
                    <Link to ={`/${currentNote.id}/edit`}>
                        <Button variant='primary'>Edit</Button>
                    </Link>
                    <Button onClick={() => {
                        onDeleteNote(currentNote.id);
                        redirect('/');
                    }} variant='outline-danger'>Delete</Button>
                    <Link to='/'>
                        <Button variant='outline-secondary'>Back</Button>
                    </Link>
                </Stack>
            </Col>
        </Row>
        <ReactMarkdown>{currentNote.markdown}</ReactMarkdown>
    </>
}

export default ShowNote;