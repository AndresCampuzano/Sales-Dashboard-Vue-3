/**
 * Normalizes a string by removing diacritics (accents and other marks).
 * @param {string} str - The string to be normalized.
 * @returns {string} A new string with diacritics removed.
 * @example
 * // Returns "hello"
 * normalizeString("héllò");
 * @example
 * // Returns "o"
 * normalizeString("ô");
 * @example
 * // Returns "ae"
 * normalizeString("äë");
 */
export function normalizeString(str: string): string {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
}

/**
 * Recursively trims whitespace from all string values within an object.
 * @param {any} obj - The object to trim.
 * @returns {any} A new object with all string values trimmed.
 * @example
 * {
 *    name: '    Blue Car    ',
 *    description: ' this is a cool description ',
 *    price: 45000,
 *    isAvailable: true,
 *    availableColors: ['red', 'green'],
 * };
 * // Output:
 * // {
 * //    name: 'Blue Car',
 * //    description: 'this is a cool description',
 * //    price: 45000,
 * //    isAvailable: true,
 * //    availableColors: ['red', 'green'],
 * // }
 */
export function trimStrings<T>(obj: T): T {
  if (typeof obj === 'string') {
    return obj.trim() as T
  }
  if (typeof obj === 'object' && obj !== null && !Array.isArray(obj)) {
    const trimmedObj: { [K in keyof T]: T[K] } = {} as { [K in keyof T]: T[K] }
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        trimmedObj[key] = trimStrings(obj[key])
      }
    }
    return trimmedObj
  }
  if (Array.isArray(obj)) {
    return obj?.map((item) => trimStrings(item)) as T
  }
  return obj
}
