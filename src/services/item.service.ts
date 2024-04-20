import type { Product } from '../types/types'
import { dynamicDelete, dynamicFetch, dynamicUpload } from '@/utils/dynamicFetch.ts'

/**
 * Fetches an Item
 */
export async function getItem(id: string): Promise<Product> {
  return await dynamicFetch(`items/${id}`)
}

/**
 * Fetches all Items
 */
export async function getItems(): Promise<Product[]> {
  return await dynamicFetch('items')
}

/**
 * Posts an Item
 */
export async function postItem(data: Product): Promise<void> {
  await dynamicUpload('items', data, 'POST')
}

/**
 * Updates an Item
 */
export async function updateItem(id: string, data: Product): Promise<void> {
  await dynamicUpload(`items/${id}`, data, 'PUT')
}

/**
 * Deletes an Item
 */
export async function deleteItem(id: string): Promise<void> {
  await dynamicDelete(`items/${id}`)
}
