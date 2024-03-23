import type { Client } from '../types/types'

/**
 * Fetches a Client
 */
export async function getClient(id: string): Promise<Client> {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/clients/${id}`)
  return await res.json()
}

/**
 * Fetches all Clients
 */
export async function getClients(): Promise<Client[]> {
  const res = await fetch(`${import.meta.env.VITE_API_URL}/api/clients`)
  return await res.json()
}

/**
 * Posts a Client
 */
export async function postClient(data: Client): Promise<void> {
  await fetch(`${import.meta.env.VITE_API_URL}/api/clients`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}

/**
 * Updates a Client
 */
export async function updateClient(id: string, data: Client): Promise<void> {
  await fetch(`${import.meta.env.VITE_API_URL}/api/clients/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}

/**
 * Deletes a Client
 */
export async function deleteClient(id: string): Promise<void> {
  await fetch(`${import.meta.env.VITE_API_URL}/api/clients/${id}`, {
    method: 'DELETE'
  })
}
