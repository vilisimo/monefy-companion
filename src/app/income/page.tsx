'use client'

import { LargeHeader, LargeText } from '@/lib/components'
import MuiDataTable from '@/lib/components/muitables/MuiTable'
import { localizeAmount } from '@/lib/tools/formatting'
import Big from 'big.js'
import { useContext } from 'react'
import { MonefyContext, MonefyCurrencyContext } from '../monefyContext'

export default function Page() {
  const data = useContext(MonefyContext)
  const { currency, locale } = useContext(MonefyCurrencyContext)

  const incomeEntries = data.filter((entry) => entry.amount.gt(0))
  const total = incomeEntries.map((entry) => entry.amount).reduce((result, current) => result.plus(current), Big(0))
  const localizedAmount = localizeAmount(total, currency, locale)

  const breakdown = new Map<string, Big>()
  for (const entry of incomeEntries) {
    if (breakdown.get(entry.category) !== undefined) {
      breakdown.set(entry.category, breakdown.get(entry.category)!.plus(entry.amount))
    } else {
      breakdown.set(entry.category, entry.amount)
    }
  }

  const rows = Array.from(breakdown).map((entry) => ({ id: entry[0], category: entry[0], amount: entry[1] }))

  return (
    <div>
      <LargeHeader className="mt-10">Total earnings</LargeHeader>
      <LargeText>{localizedAmount}</LargeText>
      <span className="m-10" />
      <MuiDataTable rows={rows} />
    </div>
  )
}
