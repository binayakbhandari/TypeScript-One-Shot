'use client'

import { useRouter } from 'next/navigation'
import React from 'react'

const PreviewButton = ({fileLink} : {fileLink : string}) => {
    const handlePreview = ()=>{
        window.open(fileLink,"_blank")
    }
    return (
        <div className="w-1/2 px-2">
            <button onClick={handlePreview} className="cursor-pointer w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600">Preview</button>
        </div>
    )
}



const DeleteButton = ({ noteId }: { noteId: string }) => {
    const router = useRouter()

    const handleDelete = async () => {
        const confirmDelete = confirm('Are you sure you want to delete this note?')
        if (!confirmDelete) return

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/notes/${noteId}`, {
                method: 'DELETE',
            })

            if (!response.ok) {
                throw new Error('Failed to delete the note.')
            }

            router.push('/') // Redirect after successful delete
        } catch (error) {
            console.error(error)
            alert('Failed to delete note.')
        }
    }

    return (
        <div className="w-1/2 px-2">
            <button onClick={handleDelete} className="cursor-pointer w-full bg-red-200 dark:bg-red-700 text-red-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-red-300 dark:hover:bg-red-600">
                Delete Note
            </button>
        </div>
    )
}

const CreateButton = () => {
    const router = useRouter()
    const EventTrigger = ()=>{
        router.push('/note/createNote')
    }
    return (
        <button onClick={EventTrigger} type="button" className="cursor-pointer text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Create Note</button>
    )
}

// const CreateNoteButton = async () => {
//     const router = useRouter()
//     const response = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/notes`, {
//         method: 'POST',
//     })
//     if (!response.ok) {
//         throw new Error('Failed to create a note.')
//     }
//     router.push('/')
//     return (
//         <button type="submit" className="cursor-pointer py-3.5 px-7 text-sm font-semibold tracking-wider rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
//             Create Note
//         </button>
//     )
// }


export { PreviewButton, DeleteButton, CreateButton}


// const DeleteButton = () => {
//     return (
//         <div className="w-1/2 px-2">
//             <button className="cursor-pointer w-full bg-red-200 dark:bg-red-700 text-red-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-red-300 dark:hover:bg-red-600">Delete Note</button>
//         </div>
//     )
// }

// const EditButton = () => {
//     return (
//         <div className="w-1/2 px-2">
//             <button className="cursor-pointer w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700">Edit Note</button>
//         </div>
//     )
// }