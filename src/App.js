import { useState, useEffect } from "react";
import "./App.css";
import ContentNotes from "./components/ContentNotes";
import ListNotes from "./components/ListNotes";
import uuid from "react-uuid";

function App() {
	const [notes, setNotes] = useState(
		localStorage.notes ? JSON.parse(localStorage.notes) : []
	);
	const [activeNote, setActiveNote] = useState(false);

	notes.sort((a, b) => b.lastModified - a.lastModified);

	useEffect(() => {
		localStorage.setItem("notes", JSON.stringify(notes));
	}, [notes]);

	const onAddNote = () => {
		const newNote = {
			id: uuid(),
			title: "Nouvelle note",
			body: "",
			lastModified: Date.now(),
		};
		setNotes([newNote, ...notes]);
	};

	const onUpdateNote = (updatedNote) => {
		const updatedNotesArray = notes.map((note) => {
			if (note.id === activeNote) {
				return updatedNote;
			}
			return note;
		});
		setNotes(updatedNotesArray);
	};

	const onDeleteNote = (id) => {
		const confirm = window.confirm(
			"Vous allez supprimer une note, êtes vous sûr ? "
		);
		if (confirm) {
			setNotes(notes.filter((note) => note.id !== id));
		}
	};

	const getActiveNote = () => {
		return notes.find((note) => note.id === activeNote);
	};

	return (
		<div className='flex'>
			<ListNotes
				notes={notes}
				setNotes={setNotes}
				onAddNote={onAddNote}
				onDeleteNote={onDeleteNote}
				activeNote={activeNote}
				setActiveNote={setActiveNote}
			/>
			<ContentNotes activeNote={getActiveNote()} onUpdateNote={onUpdateNote} />
		</div>
	);
}

export default App;
