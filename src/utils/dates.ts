import { DateTime } from 'luxon'

/**
 * @private
 */
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

/**
 * Sorts an array of objects by the "month" property in the format 'Month Year'.
 */
export function sortArrayByMonthAndYear<T>(arr: T[]): T[] {
  /**
   * Custom comparator function to compare two objects based on their "month" property.
   */
  const compareDates = (a: unknown, b: unknown) => {
    // FIXME: Fix types

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const aMonth = months.indexOf(a.month.split(' ')[0])
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const bMonth = months.indexOf(b.month.split(' ')[0])
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore

    const aYear = parseInt(a.month.split(' ')[1])
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const bYear = parseInt(b.month.split(' ')[1])

    if (aYear !== bYear) {
      return bYear - aYear
    } else {
      return bMonth - aMonth
    }
  }
  return arr.sort(compareDates)
}

/**
 * By a given month and year, returns the month and year in spanish
 * @example "January 2021" -> "Enero 2021"
 */
export function localizeMonthInUI(monthString: string): string {
  const dateTime = DateTime.fromFormat(monthString, 'MMMM yyyy')
  const localizedMonth = dateTime.setLocale('es').toFormat('MMMM yyyy')
  return localizedMonth.charAt(0).toUpperCase() + localizedMonth.slice(1)
}
