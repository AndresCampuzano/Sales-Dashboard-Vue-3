import type { Sale, SaleWithCustomerAndItemData } from '../types/types'
import { dynamicFetch, dynamicUpload } from '@/utils/dynamicFetch.ts'

/**
 * Gets all Sales
 */
export async function getSales(): Promise<SaleWithCustomerAndItemData[]> {
  return await dynamicFetch('sales')
}

/**
 * Post all Sales
 */
export async function postSale(data: Sale): Promise<void> {
  return await dynamicUpload('sales', data, 'POST')
}
