import { Badge, Card, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import { NotePreviewProps } from "../../App";
import styles from './NotePreview.module.css';

const NotePreview = ({ id, title, tags }: NotePreviewProps) => {
    return (
        <Card as={Link} to={`/${id}`} className={`${styles.preview} h-100 text-reset text-decoration-none`}>
            <Card.Body>
                <Stack gap={2} className='align-items-center justify-content-center h-100'>
                    <p className="fs-5">{title}</p>
                    {tags.length > 0 && (
                        <Stack
                            className='justify-content-center flex-wrap'
                            direction='horizontal'
                            gap={1}
                        >
                            {tags.map((tag) => {
                                return (
                                    <Badge className='text-truncate' key={tag.id}>{tag.label}</Badge>
                                )
                            })}
                        </Stack>
                    )}
                </Stack>
            </Card.Body>
        </Card>
    )
}

export default NotePreview;