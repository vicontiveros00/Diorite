import { Form, Stack, Row, Col, Button } from 'react-bootstrap';
import CreatableReactSelect from 'react-select/creatable';
import { Link, useNavigate } from 'react-router-dom';
import { FormEvent, useRef, useState } from 'react';
import { NoteComponentProps, Tag } from '../App';
import { v4 as generateUUID } from 'uuid';

const NoteForm = ({ onSubmit, onAddTag, existingTags }: NoteComponentProps) => {
    const titleRef = useRef<HTMLInputElement>(null);
    //get title from input
    const textRef = useRef<HTMLTextAreaElement>(null);
    //get markdown text from textarea
    const [noteTags, setCurrentTags] = useState<Tag[]>([])
    //rerender when tag changes and store them
    const redirect = useNavigate();

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        onSubmit({
            title: titleRef.current!.value,
            markdown: textRef.current!.value,
            tags: noteTags
        })
        //submit to NoteData
        redirect('..')
        //redirect to previous page
    }

    //assign label and tag id to each tag so CreateReactSelect can recognize each tag, peep CreatableReactSelect documantation, same thing for value attribute and onChange attribute
    const convertTags = (tags: Tag[]) => {
        return tags.map((tag) => {
            return {
                label: tag.label,
                value: tag.id
            }
        })
    }

    return (
        <Form onSubmit={handleSubmit}>
            <Stack gap={4}>
                <Row>
                    <Col>
                        <Form.Group controlId='title'>
                            <Form.Label>Title</Form.Label>
                            <Form.Control className='input-title' ref={titleRef} required />
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId='tags'>
                            <Form.Label>Tags</Form.Label>
                            <CreatableReactSelect 
                            className="react-select-container"
                            classNamePrefix="react-select" 
                            options={convertTags(existingTags)}
                            value={convertTags(noteTags)}
                            onChange={tags => {
                                setCurrentTags(tags.map(tag => {
                                    return {
                                        label: tag.label,
                                        id: tag.value
                                    }
                                }))
                                //assign id to each tag appropriate keys for type Tag to be used in the app, essentially converting from what CreateReactSelect expects into an appropriate Tag object
                            }}
                            onCreateOption={(label) => {
                                const newTag = {
                                    id: generateUUID(),
                                    label
                                }
                                onAddTag(newTag);
                                //store tags to localstorage
                                setCurrentTags((previousTags) => [...previousTags, newTag]);
                                //add newly added tag to tags list
                            }}
                            isMulti />
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group controlId='markdown'>
                    <Form.Label>Text</Form.Label>
                    <Form.Control className='input-text' ref={textRef} required as="textarea" rows={14} />
                </Form.Group>
                <Stack direction='horizontal' gap={2} className='justify-content-end'>
                    <Button type='submit' variant='primary'>Save</Button>
                    <Link to='..'>
                        <Button type='button' variant='outline-secondary'>Cancel</Button>
                    </Link>
                </Stack>
            </Stack>    
        </Form>
    )
}

export default NoteForm;