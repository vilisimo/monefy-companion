import { MonefyContext, MonefyCurrencyContext } from '@/app/monefyContext'
import { sumByKey } from '@/lib/tools'
import { localizeAmount } from '@/lib/tools/formatting'
import Big from 'big.js'
import Link from 'next/link'
import { useContext } from 'react'

interface SummaryRowProps {
  prefix: string
  row: [string, Big]
  currency: string
  locale: string
}

const SummaryRow = ({ prefix, row, currency, locale }: SummaryRowProps) => {
  const [category, amount] = row
  const formattedAmount = localizeAmount(amount, currency, locale)
  const slugified = category.toLowerCase().replace(' ', '-')

  return (
    <div>
      <Link href={`${prefix}-${slugified}`}>
        {category}: {formattedAmount}
      </Link>
    </div>
  )
}

export function Summary() {
  const data = useContext(MonefyContext)
  const { currency, locale } = useContext(MonefyCurrencyContext)

  const summary = sumByKey(data)
  const entries = Object.entries(summary)
  const income = entries.filter((e) => e[1].gt(0))
  income.sort((a, b) => b[1].minus(a[1]).toNumber())
  const expenses = entries.filter((e) => e[1].lte(0))
  expenses.sort((a, b) => a[1].minus(b[1]).toNumber())

  return (
    <div>
      <h1>Summary</h1>
      <h2>Income:</h2>
      {income.map((s) => (
        <SummaryRow prefix="income" key={s[0]} row={s} currency={currency} locale={locale} />
      ))}
      <h2>Expenses:</h2>
      {expenses.map((s) => (
        <SummaryRow prefix="expenses" key={s[0]} row={s} currency={currency} locale={locale} />
      ))}
    </div>
  )
}
