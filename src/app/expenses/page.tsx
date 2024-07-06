'use client'

import { MonefyContext, MonefyCurrencyContext } from '@/app/monefyContext'
import { LargeHeader, LargeText } from '@/lib/components'
import { Leaderboard } from '@/lib/components/leaderboard'
import { localizeAmount } from '@/lib/tools/formatting'
import Big from 'big.js'
import { useContext } from 'react'

export default function Page() {
  const data = useContext(MonefyContext)
  const { currency, locale } = useContext(MonefyCurrencyContext)

  const expenses = data.filter((entry) => entry.amount.lt(0))
  const total = expenses.map((entry) => entry.amount).reduce((result, current) => result.plus(current), Big(0))
  const localizedTotal = localizeAmount(total, currency, locale)

  const breakdown = new Map<string, Big>()
  for (const entry of expenses) {
    if (breakdown.get(entry.category) !== undefined) {
      breakdown.set(entry.category, breakdown.get(entry.category)!.minus(entry.amount))
    } else {
      breakdown.set(entry.category, entry.amount)
    }
  }

  const entries = Array.from(breakdown)

  return (
    <div>
      <LargeHeader className="mt-10">Total expenses</LargeHeader>
      <LargeText>{localizedTotal}</LargeText>
      <span className="block mt-10" />
      <Leaderboard entries={entries} limit={5} />
    </div>
  )
}
