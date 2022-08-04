import { useState, useEffect } from "react";
import "./App.css";
import Main from "./components/Main";
import Sidebar from "./components/Sidebar";
import uuid from "react-uuid";

function App() {
	const [notes, setNotes] = useState(
		localStorage.notes ? JSON.parse(localStorage.notes) : []
	);
	const [activeNote, setActiveNote] = useState(false);

	notes.sort((a, b) => a.lastModified - b.lastModified);

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
		<div className='App'>
			<Sidebar
				notes={notes}
				onAddNote={onAddNote}
				onDeleteNote={onDeleteNote}
				activeNote={activeNote}
				setActiveNote={setActiveNote}
			/>
			<Main activeNote={getActiveNote()} onUpdateNote={onUpdateNote} />
		</div>
	);
}

export default App;
