// 'use client'

// import Image from 'next/image'
// import Link from 'next/link'
// import { useRouter } from 'next/navigation'
// import React from 'react'
// import { CreateNoteButton } from '../components/PreviewButton'

// const CreateNote = () => {
//     return (
//         <>
//             <div className="max-w-4xl mx-auto font-[sans-serif] p-6">
//                 <div className="text-center mb-16">
//                     <Link href="">
//                         <Image
//                             src="https://www.stampegrafica.plus/13088-large_default/copy-of-notesnotebook-14-x-21-cm-with-cover-in-cotton-and-white-pages-customizable-with-your-logo.jpg"
//                             alt="logo"
//                             width={96}
//                             height={96}
//                             className="mb-3 rounded-full shadow-lg inline-block"
//                         />
//                     </Link>
//                     <h4 className="text-gray-800 text-base font-semibold mt-6">Write Your Own Note</h4>
//                 </div>

//                 <form>
//                     <div className="grid sm:grid-cols-1 gap-8">
//                         <div>
//                             <label className="text-gray-800 text-sm mb-2 block">Title</label>
//                             <input name="title" type="text" className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter title" required />
//                         </div>
//                         <div>
//                             <label className="text-gray-800 text-sm mb-2 block">Subtitle</label>
//                             <input name="subtitle" type="text" className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter subtitle" required />
//                         </div>
//                         <div>
//                             <label className="text-gray-800 text-sm mb-2 block">Image</label>
//                             <input name="image" type="file" className="cursor-pointer bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" required />
//                         </div>
//                         <div>
//                             <label className="text-gray-800 text-sm mb-2 block">Description</label>
//                             <textarea name="description" itemType='text' className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all" placeholder="Enter description" required />
//                         </div>
//                     </div>

//                     <div className="!mt-12">
//                         <CreateNoteButton />
//                     </div>
//                 </form>
//             </div>
//         </>
//     )
// }

// export default CreateNote

'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const CreateNote = () => {
  const router = useRouter()

  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
  })
  const [imageFile, setImageFile] = useState<File | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) setImageFile(file)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const form = new FormData()
    form.append('title', formData.title)
    form.append('subtitle', formData.subtitle)
    form.append('description', formData.description)
    if (imageFile) form.append('file', imageFile)

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/notes`, {
        method: 'POST',
        body: form,
      })

      if (!res.ok) {
        throw new Error('Failed to create a note.')
      }

      router.push('/')
    } catch (err) {
      console.error(err)
      alert('Error while creating note')
    }
  }

  return (
    <div className="max-w-4xl mx-auto font-[sans-serif] p-6">
      <div className="text-center mb-16">
        <Link href="/">
          <Image
            src="https://www.stampegrafica.plus/13088-large_default/copy-of-notesnotebook-14-x-21-cm-with-cover-in-cotton-and-white-pages-customizable-with-your-logo.jpg"
            alt="logo"
            width={96}
            height={96}
            className="mb-3 rounded-full shadow-lg inline-block"
          />
        </Link>
        <h4 className="text-gray-800 text-base font-semibold mt-6">Write Your Own Note</h4>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid sm:grid-cols-1 gap-8">
          <div>
            <label className="text-gray-800 text-sm mb-2 block">Title</label>
            <input
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
              placeholder="Enter title"
              required
            />
          </div>
          <div>
            <label className="text-gray-800 text-sm mb-2 block">Subtitle</label>
            <input
              name="subtitle"
              type="text"
              value={formData.subtitle}
              onChange={handleChange}
              className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
              placeholder="Enter subtitle"
              required
            />
          </div>
          <div>
            <label className="text-gray-800 text-sm mb-2 block">Image</label>
            <input
              name="image"
              type="file"
              onChange={handleFileChange}
              className="cursor-pointer bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
              required
            />
          </div>
          <div>
            <label className="text-gray-800 text-sm mb-2 block">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="bg-gray-100 w-full text-gray-800 text-sm px-4 py-3.5 rounded-md focus:bg-transparent outline-blue-500 transition-all"
              placeholder="Enter description"
              required
            />
          </div>
        </div>

        <div className="mt-12">
          <button
            type="submit"
            className="cursor-pointer py-3.5 px-7 text-sm font-semibold tracking-wider rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
          >
            Create Note
          </button>
        </div>
      </form>
    </div>
  )
}

export default CreateNote
