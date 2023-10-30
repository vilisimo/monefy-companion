'use client'

import { UploadForm } from '@/lib/components/'
import { Entry } from '@/lib/data'
import { PropsWithChildren, createContext, useState } from 'react'

export const MonefyContext = createContext<Entry[]>([])

export const MonefyUploader = ({ children }: PropsWithChildren) => {
  const [data, setData] = useState<Entry[]>([])

  return (
    <div>
      {data.length <= 0 && <UploadForm handleData={setData} />}
      {data.length > 0 && <MonefyContext.Provider value={data}>{children}</MonefyContext.Provider>}
    </div>
  )
}
