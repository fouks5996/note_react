import React from "react";

function NoteDisplay({ setSwitchMd, onEditField, activeNote }) {
	return (
		<div className='bg-[#00000005] w-full py-5 px-6 h-screen'>
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
				className='font-bold block mb-5 w-full p-2 resize-none bg-transparent h-12 text-4xl'
				value={activeNote.title}
				onChange={(e) => onEditField("title", e.target.value)}
				autoFocus
			/>
			<textarea
				id='body'
				className='block mb-5 w-full h-screen p-2 resize-none bg-transparent'
				value={activeNote.body}
				onChange={(e) => onEditField("body", e.target.value)}
				placeholder='Laisser libre court à votre imagination ...'
			/>
		</div>
	);
}

export default NoteDisplay;
