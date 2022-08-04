import React, { useState } from "react";
import MarkdownInput from "./MarkdownInput";
import NoteDisplay from "./NoteDisplay";

function ContentNotes({ activeNote, onUpdateNote }) {
	const [switchMd, setSwitchMd] = useState(false);

	const onEditField = (key, value) => {
		onUpdateNote({
			...activeNote,
			[key]: value,
			lastModified: Date.now(),
		});
	};

	if (!activeNote)
		return (
			<div className='w-full h-screen leading-[100vh] text-center text-3xl text-gray-500'>
				{" "}
				Pas de note sélectionnée{" "}
			</div>
		);

	return (
		<div className=' h-screen w-[90%] relative flex'>
			{!switchMd ? (
				<NoteDisplay
					setSwitchMd={setSwitchMd}
					onEditField={onEditField}
					activeNote={activeNote}
				/>
			) : (
				<MarkdownInput setSwitchMd={setSwitchMd} activeNote={activeNote} />
			)}
		</div>
	);
}

export default ContentNotes;
