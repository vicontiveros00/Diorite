import { Button, Col, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";

const NoteList = () => {
    return (
        <>
            {/*nav bar*/}
            <Row>
                <Col>
                    <h1>Diorites</h1>
                </Col>
                <Col xs="auto">
                    <Stack direction={"horizontal"} gap={2}>
                        <Link to ='/new'>
                            <Button variant='primary'>New Diorite</Button>
                        </Link>
                        <Button variant='outline-secondary'>Manage Tags</Button>
                    </Stack>
                </Col>
            </Row>
            {/*end nav bar*/}
        </>
    )
}

export default NoteList;