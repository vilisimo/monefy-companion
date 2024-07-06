import { MonefyCurrencyContext } from '@/app/monefyContext'
import { LargeHeader, LargeText, MediumHeader } from '@/lib/components'
import { Entry } from '@/lib/data'
import { localizeAmount } from '@/lib/tools/formatting'
import Big from 'big.js'
import { useContext } from 'react'

const LeaderboardTable = ({ entries }: { entries: [string, Big][] }) => {
  const { currency, locale } = useContext(MonefyCurrencyContext)

  return (
    <ul className="my-5 grid justify-center">
      {entries.map((entry) => (
        <li key={entry[0]} className="flex gap-10 justify-between">
          <div>{entry[0]}</div>
          <div>{localizeAmount(entry[1], currency, locale)}</div>
        </li>
      ))}
    </ul>
  )
}

interface Props {
  entries: Entry[]
  type: 'income' | 'expenses'
}

export function Leaderboard({ entries, type }: Props) {
  // TODO: show the rest of the entries
  // TODO: remove muitable
  const { currency, locale } = useContext(MonefyCurrencyContext)

  const total = entries.map((entry) => entry.amount).reduce((result, current) => result.plus(current), Big(0))
  const localizedTotal = localizeAmount(total, currency, locale)

  const breakdown = new Map<string, Big>()
  for (const entry of entries) {
    if (breakdown.get(entry.category) !== undefined) {
      breakdown.set(entry.category, breakdown.get(entry.category)!.plus(entry.amount))
    } else {
      breakdown.set(entry.category, entry.amount)
    }
  }

  const sortedEntries = Array.from(breakdown).sort((a, b) => b[1].minus(a[1]).toNumber())
  const sortedByType = type === 'income' ? sortedEntries : sortedEntries.reverse()

  return (
    <div>
      <LargeHeader className="mt-10">Total expenses</LargeHeader>
      <LargeText>{localizedTotal}</LargeText>
      <span className="block mt-10" />
      <MediumHeader>Category breakdown:</MediumHeader>
      <LeaderboardTable entries={sortedByType} />
    </div>
  )
}
