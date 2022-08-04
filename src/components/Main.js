import React, { useState } from "react";
import ReactMarkdown from "react-markdown";

function Main({ activeNote, onUpdateNote }) {
	const [switchMd, setSwitchMd] = useState(false);

	const onEditField = (key, value) => {
		onUpdateNote({
			...activeNote,
			[key]: value,
			lastModified: Date.now(),
		});
	};

	console.log(switchMd);

	if (!activeNote)
		return <div className='no-active-note'> Pas de note sélectionnée </div>;

	return (
		<div className='app-main'>
			{!switchMd ? (
				<div className='app-main-note-edit'>
					<div className='flex items-start gap-5 mb-2'>
						<button
							className='text-zinc-700 p-3 rounded-full flex items-center gap-2 hover:bg-slate-100 hover:text-zinc-700 '
							onClick={() => setSwitchMd((switchMd) => !switchMd)}>
							{
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
										d='M15 12a3 3 0 11-6 0 3 3 0 016 0z'
									/>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										d='M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z'
									/>
								</svg>
							}
							Activer le mode markdown
						</button>
					</div>
					<input
						type='text'
						id='title'
						className='font-bold'
						value={activeNote.title}
						onChange={(e) => onEditField("title", e.target.value)}
						autoFocus
					/>
					<textarea
						id='body'
						value={activeNote.body}
						onChange={(e) => onEditField("body", e.target.value)}
						placeholder='Laisser libre court à votre imagination ...'
					/>
				</div>
			) : (
				<div className='app-main-note-preview'>
					<div className='flex gap-5'>
						<button
							className='text-zinc-700 p-3 rounded-full flex items-center gap-2 hover:bg-slate-100 hover:text-zinc-700 '
							onClick={() => setSwitchMd((switchMd) => !switchMd)}>
							{
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
										d='M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21'
									/>
								</svg>
							}
							Retour à l'édition
						</button>
					</div>
					<h1 className='preview-title'> {activeNote.title} </h1>
					<ReactMarkdown className='markdown-preview'>
						{activeNote.body}
					</ReactMarkdown>
				</div>
			)}
		</div>
	);
}

export default Main;
