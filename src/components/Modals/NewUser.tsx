import { Button, Modal, Stack } from "react-bootstrap"
import { Link } from "react-router-dom"
import { NewUserModal } from "../../util/types"

const NewUser = ({ showNewUserModal, handleClose }: NewUserModal) => {
    return (
        <Modal show={showNewUserModal}>
            <Modal.Header closeButton closeVariant="white" onHide={handleClose}>
                <Modal.Title>Welcome to Diorite!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Stack gap={2}>
                    <p>Diorite is an in-browser note taking app with full Markdown support. If you're unfamiliar with Markdown or need a refresher, <a target='_blank' rel="noreferrer" href='https://www.markdownguide.org/basic-syntax/'>check out some Markdown documentation</a> to take full advantage of this app.</p>
                    <ul>
                        <li className='mb-3'>Stay organized and assign your diorites a tag to categorize them.</li>
                        <li className='mb-3'>Search by title or filter by tags.</li>
                        <li className='mb-3'>Edit and delete your diorites.</li>
                        <li>Diorites are stored locally in your browser as JSON.</li>
                    </ul>
                    <Link to='/new'>
                        <Button variant="primary">Get started</Button>
                    </Link>
                </Stack>
            </Modal.Body>
        </Modal>
    )
}

export default NewUser