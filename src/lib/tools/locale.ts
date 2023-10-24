const DEFAULT_LOCALE = 'en-US'

export const getClientLocale = (): string => {
  if (typeof Intl !== 'undefined') {
    try {
      return Intl.NumberFormat().resolvedOptions().locale
    } catch (err) {
      console.error(`Cannot get locale from Intl, falling back to ${DEFAULT_LOCALE}`, err)
      return DEFAULT_LOCALE
    }
  } else {
    console.log(`Intl not found, falling back to ${DEFAULT_LOCALE}`)
    return DEFAULT_LOCALE
  }
}
