import { COLORS } from '@/constants/constants'

/**
 * Recovers the color from the constants file based on the label
 * @example
 * colorFromLocalConstants('Verde')
 * // returns: { bgColor: '#24a124', textColor: '#ffffff' }
 */
export const colorFromLocalConstants = (label: string) => {
  const color = COLORS.find((color) => color.label === label)
  return color
    ? {
        bgColor: color.color,
        textColor: color?.textColor || '#ffffff'
      }
    : {
        bgColor: '#000000',
        textColor: '#ffffff'
      }
}

/**
 * Generates a hex color based on the input string.
 * @param {string} input - The input string to generate the color from.
 * @returns {string} The generated color in hex format.
 * @example
 * const color1 = dynamicColorFromString('AC'); // Output: dynamically generated hex vibrant color
 * const color2 = dynamicColorFromString('JD'); // Output: dynamically generated hex vibrant color
 *
 */
export function dynamicColorFromString(input: string): string {
  // Generate a hash based on the input string
  const hashCode = hashString(input)

  // Convert the hash code to a vibrant hex color
  return intToVibrantRGB(hashCode)
}

/**
 * Generates a hash code for a given string.
 * @private
 * @param {string} str - The input string to generate the hash code from.
 * @returns {number} The generated hash code.
 */
function hashString(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  return hash
}

/**
 * Converts an integer hash code to a vibrant RGB color.
 * @private
 * @param {number} i - The integer hash code.
 * @returns {string} The generated vibrant color in hex format.
 */
function intToVibrantRGB(i: number): string {
  const goldenRatioConjugate = 0.618033988749895
  const hue = (i * goldenRatioConjugate) % 1
  const saturation = 0.7
  const value = 0.9
  const h = hue * 360
  const s = saturation * 100
  const v = value * 100

  return hsvToRgb(h, s, v)
}

/**
 * Converts HSV (Hue, Saturation, Value) color components to RGB (Red, Green, Blue).
 * @private
 * @param {number} h - The hue component (0-360).
 * @param {number} s - The saturation component (0-100).
 * @param {number} v - The value component (0-100).
 * @returns {string} The generated color in hex format.
 */
function hsvToRgb(h: number, s: number, v: number): string {
  const c = (s / 100) * (v / 100)
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1))
  const m = v / 100 - c
  let r = 0,
    g = 0,
    b = 0

  if (0 <= h && h < 60) {
    r = c
    g = x
    b = 0
  } else if (60 <= h && h < 120) {
    r = x
    g = c
    b = 0
  } else if (120 <= h && h < 180) {
    r = 0
    g = c
    b = x
  } else if (180 <= h && h < 240) {
    r = 0
    g = x
    b = c
  } else if (240 <= h && h < 300) {
    r = x
    g = 0
    b = c
  } else if (300 <= h && h < 360) {
    r = c
    g = 0
    b = x
  }

  // Convert RGB to hex
  const rHex = Math.round((r + m) * 255)
    .toString(16)
    .padStart(2, '0')
  const gHex = Math.round((g + m) * 255)
    .toString(16)
    .padStart(2, '0')
  const bHex = Math.round((b + m) * 255)
    .toString(16)
    .padStart(2, '0')

  return `#${rHex}${gHex}${bHex}`
}
