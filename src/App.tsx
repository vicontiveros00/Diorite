//typescript is painful but i'm trying
import { Routes, Route, Navigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import NewNote from './components/NewNote';
import useLocalStorage from './hooks/useLocalStorage';
import { useMemo } from 'react';
import { v4 as generateUUID } from 'uuid';

//types
export type RawNote = {
  id: string
} & RawNoteData
//in the event a diorite note is edited, id will remain the same even if content changes

export type RawNoteData = {
  title: string,
  markdown: string,
  tagIds: string[]
  //only takes id of each tag to keep reference if tag content changes
}

export type Tag = {
  id: string,
  label: string
}

export type NoteData = {
  title: string,
  markdown: string,
  tags: Tag[]
}

type Note = {
  id: string
} & NoteData

//type for note components such as newnote and noteform
export type NoteComponentProps = {
  onSubmit: (data: NoteData) => void
  onAddTag: (tag: Tag) => void
  existingTags: Tag[]
}
//

const App = () => {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("Notes", [])
  const [tags, setTags] = useLocalStorage<Tag[]>("Tags", [])

  const notesWithTags = useMemo(() => {
    return notes.map(note => {
      return {
        ...note,
        tags: tags.filter(tag => note.tagIds.includes(tag.id))
      }
      //loop through notes, get tags with associate IDs from each stored note when a note or tag is updated
    })
  }, [notes, tags])

  const createNote = ({ tags, ...data }: NoteData) => {
    setNotes((previousNotes) => {
      return [...previousNotes, {
        ...data,
        id: generateUUID(),
        //generate unique uuid for each tag
        tagIds: tags.map((tag) => {
          return tag.id
        })
      }]
    })
  }
  
  const addTag = (tag: Tag) => {
    setTags((previousTags) => [...previousTags, tag]);
  } 

  return (
    <Container className="my-4">
      <Routes>
        <Route path="/" element={
          //temporary home page element until implemented
          <>
            <h1>Diorite</h1>
            <p>Write Diorites (notes) and store them locally in your browser as JSON. Full Markdown support.</p>
            <Link to="/new">Create Note</Link>
          </>
        } />
        <Route path="/new" element={<NewNote
          onSubmit={createNote}
          onAddTag={addTag}
          existingTags={tags}
        />} />
        <Route path="/:id">
          <Route index element = {<h1>Show</h1>} />
          <Route path="edit" element = {<h1>Edit</h1>} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Container>
  )
}

export default App;