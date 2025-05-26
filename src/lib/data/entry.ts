import { MonefyRow } from '.'
import { parse } from 'date-fns/parse'
import Big from 'big.js'

export interface Entry {
  date: Date
  amount: Big
  currency: string
  category: string
  description: string
}

export const rowToEntry = (row: MonefyRow): Entry => {
  const date = parse(row.date, 'dd/MM/yyyy', new Date())
  const amount = Big(row.amount.replace(',', ''))

  return {
    date,
    amount,
    currency: row.currency,
    category: row.category,
    description: row.description,
  }
}
