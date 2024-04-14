import type { SaleWithClientAndItemData } from '../types/types'
import { dynamicFetch } from '@/utils/dynamicFetch.ts'

/**
 * Gets all Sales
 */
export async function getSales(): Promise<SaleWithClientAndItemData[]> {
  // const response = await fetch(`${import.meta.env.VITE_API_URL}/api/`)
  // return await response.json()
  return await dynamicFetch('sales')
}

/**
 * Posts a Sale
 * TODO: needs more work
 */
// export async function postSale(data: Sale): Promise<void> {
//   await fetch(`${import.meta.env.VITE_API_URL}/api/sales`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify(data)
//   })
// }
