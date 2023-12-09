'use client'

import { LargeHeader, LargeText } from '@/lib/components'
import { Leaderboard } from '@/lib/components/leaderboard'
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

  const entries = Array.from(breakdown)

  return (
    <div>
      <LargeHeader className="mt-10">Total earnings</LargeHeader>
      <LargeText>{localizedAmount}</LargeText>
      <span className="block mt-10" />
      <Leaderboard entries={entries} limit={5} />
    </div>
  )
}
