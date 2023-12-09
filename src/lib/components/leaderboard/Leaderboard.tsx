import Big from 'big.js'
import { MediumHeader } from '..'
import { MonefyCurrencyContext } from '@/app/monefyContext'
import { useContext } from 'react'
import { localizeAmount } from '@/lib/tools/formatting'

interface Props {
  entries: [string, Big][]
  limit: number
}

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

export function Leaderboard({ entries, limit }: Props) {
  // TODO: show the rest of the entries
  // TODO: remove muitable
  const sortedEntries = entries.sort((a, b) => b[1].minus(a[1]).toNumber())
  const topN = sortedEntries.slice(0, limit)

  return (
    <div>
      <MediumHeader>Top {limit} categories:</MediumHeader>
      <LeaderboardTable entries={topN} />
    </div>
  )
}
