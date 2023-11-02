import { Entry } from '@/lib/data'
import { createContext } from 'react'

export const MonefyContext = createContext<Entry[]>([])

interface MonefyCurrency {
  currency: string
  locale: string
}

export const MonefyCurrencyContext = createContext<MonefyCurrency>({ currency: '', locale: '' })
