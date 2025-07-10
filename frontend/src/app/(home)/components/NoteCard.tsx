import { Note } from '@/types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const NoteCard = ({ notes }: { notes: Note[] }) => {
    return (
        <>
            <div className='flex flex-wrap justify px-3 py-3 mt-[10px]'>
                {
                    notes.map((note) => {
                        return (
                            <div className="flex px-3 py-3 mt-1" key={note._id}>
                                <div className="max-w-sm rounded overflow-hidden shadow-lg">
                                    <Image src={note.file} alt={note.title} width={350} height={100}/>
                                    <div className="px-6 py-4">
                                        <div className="font-bold text-xl mb-2">{note.title}</div>
                                        <div className="font-bold text-xl mb-2">{note.subtitle}</div>
                                        <p className="text-gray-700 text-base">
                                            {note.description}
                                        </p>
                                    </div>
                                <Link href={`/note/${note._id}`}>
                                <button id="toggle-btn" className="cursor-pointer p-4 text-blue-500 text-2xl focus:outline-none">Read More</button>
                                </Link>
                                </div>
                            </div>
                        )
                    })
                }
            </div >
        </>
    )
}

export default NoteCard


