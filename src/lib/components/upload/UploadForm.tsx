import { Entry, MonefyRow, rowToEntry } from '@/lib/data'
import { isBefore, startOfTomorrow } from 'date-fns'
import Papa, { ParseResult } from 'papaparse'
import React from 'react'

interface Props {
  handleData: (entries: Entry[]) => void
}

export const UploadForm = ({ handleData: handleEntries }: Props) => {
  const changeHandler = (event: React.FormEvent<HTMLInputElement>) => {
    const eventTarget = event.target as HTMLInputElement
    const file = eventTarget.files?.item(0)
    if (!file) {
      throw new Error('File not found')
    }

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results: ParseResult<MonefyRow>) => {
        const entries = results.data.map((r) => rowToEntry(r)).filter((r) => isBefore(r.date, startOfTomorrow()))
        handleEntries(entries)
      },
    })
  }

  return (
    <input
      type="file"
      name="file"
      accept=".csv"
      className="block mx-auto my-2.5 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-white file:text-green-700 hover:file:bg-green-50 file:cursor-pointer cursor-pointer"
      onChange={changeHandler}
    />
  )
}
