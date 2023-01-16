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
import Package from '../package.json';
import { RawNote, Tag, NoteData } from './util/types';

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

  const deleteNote = (id: string) => {
    setNotes ((previousNotes) => {
      return previousNotes.filter((note) => {
        return note.id !== id
      })
    })
  }
  
  
  const addTag = (tag: Tag) => {
    setTags((previousTags) => [...previousTags, tag]);
  }

  const updateTag = (id: string, label: string) => {
    setTags((previousTags) => {
      return previousTags.map((tag) => {
        if (tag.id === id) {
          return {
            ...tag,
            label
          }
        } else {
          return tag;
        }
      })
    })
  }

  const removeTag = (id: string) => {
    setTags((previousTags) => {
      return previousTags.filter((tag) => {
        return tag.id !== id
      })
    })
  }

  return (
    <Container className="my-3">
      {/*Routing*/}
      <Routes>
        <Route path="/" element={<NoteList existingTags={tags} notes={notesWithTags} updateTag={updateTag} removeTag={removeTag} />} />
        <Route path="/new" element={<NewNote
          onSubmit={createNote}
          onAddTag={addTag}
          existingTags={tags}
        />} />
        <Route path="/:id" element={<Layout notes={notesWithTags} /> }>
          <Route index element = {<ShowNote onDeleteNote={deleteNote} />} />
          <Route path="edit" element = {<EditNote 
            onSubmit={updateNote}
            onAddTag={addTag}
            existingTags={tags}
          />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <div className='footer'>
        <small>v{Package.version}</small><br />
        <a href='https://github.com/vicontiveros00'>github/vicontiveros00</a>
      </div>
    </Container>
  )
}

export default App;