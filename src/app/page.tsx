'use client'

import { useState } from "react"

export default function Home() {

  const [file, setFile] = useState<File>()

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!file) return
    
    try {
      const data = new FormData()
      data.set('file', file)
  
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: data
      })
  
      if(!res.ok) throw new Error(await res.text());
      
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <main className="h-screen p-6 bg-slate-400 flex-col justify-center align-middle">

      <form onSubmit={ onSubmit }>
        <h3 className="p-4">Upload files</h3>
        
        <input 
          
          type="file"
          name="file"
          onChange={(e) => setFile(e.target.files?.[0])}
        />
        <div className="m-4">
        <input type="submit" value="Upload" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" />
        </div>
      </form>
    </main>
  )
}
