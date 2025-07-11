import Image from 'next/image'
import React from 'react'
import { DeleteButton, PreviewButton } from '../components/PreviewButton'

interface Params {
  params: { noteId: string }
}

export default async function SingleNote({ params }: Params) {
  let note = null
    try {
        const response = await fetch(`${process.env.BACKEND_URL}/notes/${params.noteId}`)
        if (!response.ok) {
            throw new Error("Error while fetching...")
        }
        const { data } = await response.json()
        note = data

    } catch (error) {
        throw new Error("Error while fetching...")
    }
    return (
        <div className="bg-gray-100 dark:bg-gray-800 py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row -mx-4">
                    <div className="md:flex-1 px-4">
                        <div className="relative h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4 overflow-hidden">
                            <Image
                                src={note.file}
                                alt="Product Image"
                                fill
                                className="object-cover"
                            />
                        </div>
                        <div className="flex -mx-2 mb-4">
                            <DeleteButton noteId={note._id} />
                            {/* <EditButton noteId={note._id}/> */}
                            <PreviewButton fileLink={note.file}/>
                        </div>
                    </div>
                    <div className="md:flex-1 px-4">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{note.title}</h2>
                        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                            {note.subtitle}
                        </p>

                        <div>
                            <span className="font-bold text-gray-700 dark:text-gray-300">Note Description:</span>
                            <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                                {note.description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

