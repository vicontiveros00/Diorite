import { useEffect, useState } from "react";
import { Button, Col, Modal, Row, Stack } from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import Package from '../../../package.json';
import { SettingsModal } from "../../util/types";

const Settings = ({ showSettingsModal, handleClose }: SettingsModal) => {
    const [deleteClickCounts, setDeleteClickCounts] = useState<number>(0);
    //be careful here if you're working with this code, setting deleteClickCounts to any number above 3 will clear local storage
    const redirect = useNavigate();

    const renderDeleteText = (): string => {
        if (deleteClickCounts > 0 && deleteClickCounts < 2) {
            return ` Clicked ${deleteClickCounts} time.`
        } else if (deleteClickCounts > 0) {
            return ` Clicked ${deleteClickCounts} times.`
        }
        return ''
    }

    useEffect(() => {
        if (deleteClickCounts >= 3) {
            localStorage.clear();
            //comment out above line to avoid accidental local storage deletion
            console.log('Local storage cleared or would be cleared.');
            redirect(0);
            //refresh page when local storage cleared
        }
    }, [deleteClickCounts]);

    return (
        <Modal show={showSettingsModal} onHide={handleClose}>
            <Modal.Header closeButton closeVariant='white'>
                <Modal.Title>Settings</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Stack gap={2}>
                    <Row>
                        <Col>Click 3 times to delete all local data.{renderDeleteText()}</Col>
                        <Col xs='auto'>
                            <Button disabled={deleteClickCounts >= 3} onClick={() => {
                                setDeleteClickCounts(deleteClickCounts + 1)
                            }}variant='danger'>Clear Data</Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p className="warning">You will lose all Diorites and tag data. This cannot be undone!</p>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <p>About:<br />Welcome to Diorite, a note taking app right in your browser with full Markdown support. Add tags to organize and filter your Diorites.</p>
                            <p>Version {Package.version}</p>
                        </Col>
                    </Row>
                </Stack>
            </Modal.Body>
        </Modal>
    )
}

export default Settings