import { Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import NewNote from './components/NewNote';
import useLocalStorage from './hooks/useLocalStorage';
import { useMemo } from 'react';

//27:25

//types
export type RawNote = {
  id: string
} & RawNoteData

export type RawNoteData = {
  title: string,
  markdown: string,
  tagIds: string[]
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
//

const App = () => {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("Notes", [])
  const [tags, setTags] = useLocalStorage<RawNote[]>("Tags", [])
  const notesWithTags = useMemo(() => {
    return notes.map(note => {
      return {...note, tags: tags.filter(tag => note.tagIds.includes(tag.id))}
    })
  }, [notes, tags])

  return (
    <Container className="my-4">
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/new" element={<NewNote />} />
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