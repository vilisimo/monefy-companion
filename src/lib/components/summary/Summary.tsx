import { Entry } from '@/lib/data'
import { getClientLocale, sumByKey } from '@/lib/tools'
import Big from 'big.js'

const SummaryRow = ({ row, currency, locale }: { row: [string, Big]; currency: string; locale: string }) => {
  const [category, amount] = row
  const formattingOptions = {
    style: 'currency',
    currency,
  }
  const formattedAmount = amount.toNumber().toLocaleString(locale, formattingOptions)

  return (
    <div>
      {category}: {formattedAmount}
    </div>
  )
}

export function Summary({ data }: { data: Entry[] }) {
  const currency = data[0].currency
  const locale = getClientLocale()
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
        <SummaryRow key={s[0]} row={s} currency={currency} locale={locale} />
      ))}
      <h2>Expenses:</h2>
      {expenses.map((s) => (
        <SummaryRow key={s[0]} row={s} currency={currency} locale={locale} />
      ))}
    </div>
  )
}
