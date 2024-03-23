import { COLORS } from '@/constants/constants'

/**
 * Recovers the color from the constants file based on the label
 */
export const colorFromConstants = (label: string) => {
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
