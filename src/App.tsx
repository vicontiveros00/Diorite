//typescript is painful but i'm trying
import { Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from 'react-bootstrap';
import NewNote from './components/NewNote';
import useLocalStorage from './hooks/useLocalStorage';
import { useMemo } from 'react';
import { v4 as generateUUID } from 'uuid';
import NoteList from './components/NoteList';
import { Layout } from './components/Layout';
import ShowNote from './components/ShowNote';
import EditNote from './components/EditNote';

//types
export type RawNote = {
  id: string
} & RawNoteData
//in the event a diorite note is edited, id will remain the same even if content changes

export type NotePreviewProps = {
  tags: Tag[],
  title: string,
  id: string
}

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

export type Note = {
  id: string
} & NoteData

//for components that use existing tags as a prop
export type NoteListProps = {
  existingTags: Tag[],
  notes: NotePreviewProps[]
}

//type for note components such as newnote and noteform
export type NoteComponentProps = {
  onSubmit: (data: NoteData) => void
  onAddTag: (tag: Tag) => void
} & NoteListProps & Partial<NoteData>

export type NoteLayoutProps = {
  notes: Note[]
}

export type EditNoteProps = {
  onSubmit: (id: string, data: NoteData) => void
  onAddTag: (tag: Tag) => void
  existingTags: Tag[]
}
//

const App = () => {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("Notes", [])
  const [tags, setTags] = useLocalStorage<Tag[]>("Tags", [])

  const notesWithTags = useMemo(() => {
    return notes.map((note) => {
      return {
        ...note,
        tags: tags.filter((tag) => {
          return note.tagIds.includes(tag.id)
        })
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

  const updateNote = (id: string, { tags, ...data }: NoteData) => {
    setNotes((previousNotes) => {
      return previousNotes.map((note) => {
        if (note.id === id) {
          return {
            ...note, //save existing note data
            ...data, //overwrite with new data
            tagIds: tags.map((tag) => {
              return tag.id;
            }) //store tags associated with note with their respective id
          }
        } else {
          return note; //no changes made
        }
      })
    })
  }
  
  const addTag = (tag: Tag) => {
    setTags((previousTags) => [...previousTags, tag]);
  } 

  return (
    <Container className="my-3">
      {/*Routing*/}
      <Routes>
        <Route path="/" element={<NoteList existingTags={tags} notes={notesWithTags} />} />
        <Route path="/new" element={<NewNote
          onSubmit={createNote}
          onAddTag={addTag}
          existingTags={tags}
          notes={[]}
        />} />
        <Route path="/:id" element={<Layout notes={notesWithTags} /> }>
          <Route index element = {<ShowNote />} />
          <Route path="edit" element = {<EditNote 
            onSubmit={updateNote}
            onAddTag={addTag}
            existingTags={tags}
          />} />
        </Route>
        {/*<Route path="*" element={<Navigate to="/" />} />*/}
      </Routes>
      <small>Prerelease</small>
    </Container>
  )
}

export default App;