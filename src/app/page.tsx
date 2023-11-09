'use client'

import { useState } from "react"

export default function Home() {

  const [files, setFile] = useState<File[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleSetFiles = (e: any) => {
    if (!!e.target.files) {
      setFile(previous => [...previous.concat(Array.from(e.target.files))])
    }
  }

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!!files.length) {
      setIsLoading(true)
      setMessage("Uploading...")

      try {

        const promise = files.map(async(file: File) => {
          const data = new FormData()
          data.set('file', file)
    
          return await fetch('/api/upload', {
            method: 'POST',
            body: data
          })
        })
  
        const res: any = await Promise.all(promise)

        if (!res[0].ok) {
          setMessage(await res[0].text())
          //throw new Error(await res[0].text())
        } else {
          setMessage("Files uploaded.")
        }

        
      } catch (error) {
        setMessage(JSON.stringify(error))
        console.error(error)
      }

      setIsLoading(false)
    }

  }

  return (
    <main className="h-screen p-6 bg-slate-400 flex-col justify-center align-middle">

      <form onSubmit={onSubmit}>
        <h3 className="p-4">Upload files</h3>

        <input

          type="file"
          name="file"
          multiple
          onChange={(e) => handleSetFiles(e)}
        />
        <div className="m-4">
          <input type="submit" value="Upload" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" />
        </div>

        <div className="mt-4">
          <span>{ message }</span>
        </div>
      </form>
    </main>
  )
}
