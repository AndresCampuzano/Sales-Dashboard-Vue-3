import type { Item } from '../types/types'

/**
 * Fetches an Item
 */
export async function getItem(id: string): Promise<Item> {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/items/${id}`)
  return await res.json()
}

/**
 * Fetches all Items
 */
export async function getItems(): Promise<Item[]> {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/items`)
  return await res.json()
}

/**
 * Posts an Item
 */
export async function postItem(data: Item): Promise<void> {
  await fetch(`${import.meta.env.VITE_API_URL}/api/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}

/**
 * Updates an Item
 */
export async function updateItem(id: string, data: Item): Promise<void> {
  await fetch(`${import.meta.env.VITE_API_URL}/api/items/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}

/**
 * Deletes an Item
 */
export async function deleteItem(id: string): Promise<void> {
  await fetch(`${import.meta.env.VITE_API_URL}/api/items/${id}`, {
    method: 'DELETE'
  })
}
