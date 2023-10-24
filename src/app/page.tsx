'use client'

import { Entry, MonefyRow, rowToEntry } from '@/lib/data'
import { isBefore, startOfTomorrow } from 'date-fns'
import Papa, { ParseResult } from 'papaparse'
import React, { useState } from 'react'
import { Summary } from '@/lib/components/'

export default function Home() {
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
    <main>
      <div>
        <input
          type="file"
          name="file"
          accept=".csv"
          style={{ display: 'block', margin: '10px auto' }}
          onChange={changeHandler}
        />
        {data.length > 0 && <Summary data={data} />}
      </div>
    </main>
  )
}
