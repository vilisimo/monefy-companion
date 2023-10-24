import { Entry } from '../data'
import Big from 'big.js'

interface CategorySummary {
  [key: string]: Big
}

export const sumByKey = (data: Entry[]) => {
  const summary: CategorySummary = {}
  for (const datum of data) {
    if (datum.category in summary) {
      summary[datum.category] = summary[datum.category].plus(datum.amount)
    } else {
      summary[datum.category] = datum.amount
    }
  }
  return summary
}
