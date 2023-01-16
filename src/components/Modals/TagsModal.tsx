import { Button, Col, Form, Modal, Row, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { TagModal } from "../../util/types";

const TagsModal = ({
    existingTags,
    showTagModal,
    handleClose,
    updateTag,
    removeTag
}: TagModal) => {
    return (
        <Modal show={showTagModal} onHide={handleClose}>
            <Modal.Header closeButton closeVariant='white'>
                <Modal.Title>Manage Tags</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Stack gap={2}>
                        {existingTags.length > 0 ?
                            existingTags.map((tag) => {
                                return (
                                    <Row key='tag.id'>
                                        <Col>
                                            <Form.Control onChange={(e) => {
                                                updateTag(tag.id, e.target.value)
                                            }} type='text' value={tag.label} />
                                        </Col>
                                        <Col xs='auto'>
                                            <Button onClick={() => {
                                                removeTag(tag.id)
                                            }} variant='outline-danger'>Delete</Button>
                                        </Col>
                                    </Row>
                                )
                            })
                        :
                            <>
                                <p>Get started with writing your first Diorite and add tags to categorize your Diorites.</p>
                                <Link to='/new'>
                                    <Button variant='primary'>Let's go!</Button>
                                </Link>
                            </>
                        }
                    </Stack>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default TagsModal;