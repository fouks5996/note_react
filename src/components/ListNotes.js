import React, { useState } from "react";
import {} from "@heroicons/react/outline";
import { useAutoAnimate } from "@formkit/auto-animate/react";

function ListNotes({
	notes,
	onAddNote,
	onDeleteNote,
	activeNote,
	setActiveNote,
}) {
	const [parent] = useAutoAnimate(/* optional config */);
	const [query, setQuery] = useState("");

	const onChange = (e) => setQuery(e.target.value);
	const notesFiltered = notes.filter((note) => {
		return note.title.toLowerCase().includes(query.toLowerCase());
	});

	return (
		<div className='w-[15%] min-w-[300px] h-screen border-r border-grey'>
			<div className='flex items-center justify-between px-5 py-4 border-b'>
				<h1 className='text-2xl m-0 font-bold'> Notes App </h1>
				<button
					className='text-zinc-700 p-3 rounded-full flex items-center gap-2 hover:bg-slate-100 hover:text-zinc-700'
					onClick={onAddNote}>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className='h-5 w-5'
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'
						strokeWidth={2}>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
						/>
					</svg>
				</button>
			</div>

			<input
				className='py-2 px-5 m-3 border w-[270px] rounded placeholder:text-sm'
				type='text'
				placeholder='Rechercher une note'
				value={query}
				onChange={onChange}
			/>

			<div ref={parent} className='overflow-y-scroll p-3  flex flex-col gap-2 '>
				{notesFiltered.map((note) => (
					<div
						className={`cursor-pointer py-[15px] px-[20px] border-b hover:bg-[#f6f6f6] rounded-lg ${
							note.id === activeNote &&
							"bg-[#FFE390] hover:bg-[#FFE390] rounded-xl border-b-0"
						}`}
						onClick={() => setActiveNote(note.id)}>
						<div className='flex items-center justify-between'>
							<div>
								<strong className='text-sm'> {note.title} </strong>
								<p className='mb-1 text-sm text-zinc-700'>
									{note.body && note.body.substr(0, 20) + "..."}
								</p>

								<small>
									{new Date(note.lastModified).toLocaleDateString("fr-FR", {
										hour: "2-digit",
										minute: "2-digit",
									})}
								</small>
							</div>
							<button
								className={`p-3 rounded-full ${
									note.id === activeNote
										? "hover:bg-[#eed693]"
										: "hover:bg-slate-200"
								}`}
								onClick={() => onDeleteNote(note.id)}>
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='h-5 w-5 text-zinc-700'
									fill='none'
									viewBox='0 0 24 24'
									stroke='grey'
									strokeWidth={2}>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
									/>
								</svg>
							</button>{" "}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}

export default ListNotes;
