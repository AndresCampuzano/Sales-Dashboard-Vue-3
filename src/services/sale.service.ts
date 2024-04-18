import type { SaleWithCustomerAndItemData } from '../types/types'
import { dynamicFetch } from '@/utils/dynamicFetch.ts'

/**
 * Gets all Sales
 */
export async function getSales(): Promise<SaleWithCustomerAndItemData[]> {
  return await dynamicFetch('sales')
}
