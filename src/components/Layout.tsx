import { Navigate, Outlet, useOutletContext, useParams } from "react-router-dom"
import { Note, NoteLayoutProps } from "../App"

export const Layout = ({ notes }: NoteLayoutProps) => {
    const { id } = useParams();
    const currentNote = notes.find((note) => {
        return note.id === id
    })

    if (currentNote == null) {
        return (
            <Navigate to='/' replace />
        )
    } else {
        return <Outlet context={currentNote} />
    }
}

export const useCurrentNote = () => {
    return useOutletContext<Note>();
}
//helper function to pass note to child routes (edit, show)