'use client'

import { Entry, MonefyRow, rowToEntry } from '@/lib/data'
import { isBefore, startOfTomorrow } from 'date-fns'
import Papa, { ParseResult } from 'papaparse'
import React, { PropsWithChildren, createContext, useState } from 'react'

export const MonefyContext = createContext<Entry[]>([])

export const MonefyUploader = ({ children }: PropsWithChildren) => {
  const [data, setData] = useState<Entry[]>([])

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
        setData(results.data.map((r) => rowToEntry(r)).filter((r) => isBefore(r.date, startOfTomorrow())))
      },
    })
  }

  return (
    <div>
      {data.length <= 0 && (
        <input
          type="file"
          name="file"
          accept=".csv"
          style={{ display: 'block', margin: '10px auto' }}
          onChange={changeHandler}
        />
      )}
      {data.length > 0 && <MonefyContext.Provider value={data}>{children}</MonefyContext.Provider>}
    </div>
  )
}
