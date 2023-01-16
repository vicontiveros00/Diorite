import { useMemo, useState, useEffect } from "react";
import { Button, Col, Row, Stack, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactSelect from 'react-select';
import convertTags from "../util/convertTags";
import { NoteListProps, Tag } from "../util/types";
import NotePreview from "./NotePreview/NotePreview";
import TagsModal from "./Modals/TagsModal";
import Settings from "./Modals/Settings";
import NewUser from "./Modals/NewUser";

const NoteList = ({ existingTags, notes, updateTag, removeTag }: NoteListProps) => {
    const [currentTags, setCurrentTags] = useState<Tag[]>([]);
    const [title, setTitle] = useState<string>('');
    const [manageTagModalOpen, setManageTagModalOpen] = useState<boolean>(false);
    const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false);
    const [showNewUserModal, setShowNewUserModal] = useState<boolean>(false);

    useEffect(() => {
        if (notes.length === 0) {
            setShowNewUserModal(true)
        }
    }, [])

    const findNote = useMemo(() => {
        return notes.filter((note) => {
            return (
                (note.title.toLowerCase().includes(title.toLowerCase()) || title === '') &&
                (currentTags.every((tag) => {
                    return note.tags.some((noteTag) => {
                        return noteTag.id === tag.id
                    })
                }) || currentTags.length === 0)
            )
        })
        //if search by title field is not empty, find notes with titles matching search query, if selected tags (currentTags) is greater than 0, filter notes with tags that match all of the selected tags
    }, [title, currentTags, notes])
    
    return (
        <>
            {/*nav bar*/}
            <Row className="align-items-center mb-4">
                <Col>
                    <h1>Diorite</h1>
                </Col>
                <Col xs="auto">
                    <Stack direction={"horizontal"} gap={2}>
                        <Link to ='/new'>
                            <Button variant='primary'>New Diorite</Button>
                        </Link>
                        <Button onClick={() => {
                            setManageTagModalOpen(true);
                        }} variant='outline-secondary'>Manage Tags</Button>
                        <Button onClick={() => {
                            setShowSettingsModal(true);
                        }}variant='outline-secondary'>⚙️</Button>
                    </Stack>
                </Col>
            </Row>
            {/*end nav bar*/}
            <Form>
                <Row className="mb-4">
                    <Col>
                        <Form.Group controlId='title'>
                            <Form.Label>Search by title</Form.Label>
                            <Form.Control type="text" value={title} onChange={(e) => {
                                setTitle(e.target.value)
                            }}/>
                        </Form.Group>
                    </Col>
                    <Col>
                    <Form.Group controlId='tags'>
                        <Form.Label>Filter by tags</Form.Label>
                        <ReactSelect 
                            className="react-select-container"
                            classNamePrefix="react-select" 
                            options={convertTags(existingTags)}
                            value={convertTags(currentTags)}
                            onChange={tags => {
                                setCurrentTags(tags.map(tag => {
                                    return {
                                        label: tag.label,
                                        id: tag.value
                                    }
                                }))
                                //assign id to each tag appropriate keys for type Tag to be used in the app, essentially converting from what CreateReactSelect expects into an appropriate Tag object
                            }}
                            isMulti />
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
            <Row xs={1} sm={2} lg={3} xl={4} className='g-3 mb-3'>
                {findNote.reverse().map((note) => {
                    //reversed to show most recent first
                    return (
                        <Col key={note.id}>
                            <NotePreview
                                id={note.id}
                                title={note.title}
                                tags={note.tags}
                            />
                        </Col>
                    )
                })}
            </Row>
            {/*Modals*/}
            <NewUser showNewUserModal={showNewUserModal} handleClose={() => {
                setShowNewUserModal(false);
            }}/>
            <TagsModal existingTags={existingTags} updateTag={updateTag} removeTag={removeTag} showTagModal={manageTagModalOpen} handleClose={() => {
                setManageTagModalOpen(false);
            }} />
            <Settings showSettingsModal={showSettingsModal} handleClose={() => {
                setShowSettingsModal(false);
            }} />
        </>
    )
}

export default NoteList;