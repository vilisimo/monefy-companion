import Big from 'big.js'

export const localizeAmount = (amount: Big, currency: string, locale: string) => {
  const formattingOptions: Intl.NumberFormatOptions = {
    style: 'currency',
    currency,
  }

  return amount.toNumber().toLocaleString(locale, formattingOptions)
}
