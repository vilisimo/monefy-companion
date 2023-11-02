'use client'

import { UploadForm } from '@/lib/components/'
import { Entry } from '@/lib/data'
import { PropsWithChildren, useState } from 'react'
import { MonefyContext, MonefyCurrencyContext } from './monefyContext'
import { getClientLocale } from '@/lib/tools'

export const MonefyCompanion = ({ children }: PropsWithChildren) => {
  const [data, setData] = useState<Entry[]>([])

  return (
    <main>
      {data.length <= 0 && (
        <>
          <h1 className="text-center text-3xl font-extrabold m-8">Supercharge your Monefy data</h1>
          <UploadForm handleData={setData} />
        </>
      )}
      {data.length > 0 && (
        <MonefyContext.Provider value={data}>
          <MonefyCurrencyContext.Provider value={{ currency: data[0].currency, locale: getClientLocale() }}>
            {children}
          </MonefyCurrencyContext.Provider>
        </MonefyContext.Provider>
      )}
    </main>
  )
}
