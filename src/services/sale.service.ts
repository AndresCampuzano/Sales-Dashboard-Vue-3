import type { Sale, SaleWithClientAndItemData } from '../types/types'

/**
 * Gets all Sales
 */
export async function getSales(): Promise<SaleWithClientAndItemData[]> {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/sales`)
  return await response.json()
}

/**
 * Posts a Sale
 */
export async function postSale(data: Sale): Promise<void> {
  await fetch(`${import.meta.env.VITE_API_URL}/api/sales`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}
