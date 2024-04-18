import type { Customer } from '../types/types'
import { dynamicDelete, dynamicFetch, dynamicUpload } from '@/utils/dynamicFetch.ts'

/**
 * Fetches a Customer
 */
export async function getCustomer(id: string): Promise<Customer> {
  return await dynamicFetch(`customers/${id}`)
}

/**
 * Fetches all Customers
 */
export async function getCustomers(): Promise<Customer[]> {
  return await dynamicFetch('customers')
}

/**
 * Posts a Customer
 */
export async function postCustomer(data: Customer): Promise<void> {
  await dynamicUpload('customers', data, 'POST')
}

/**
 * Updates a Customer
 */
export async function updateCustomer(id: string, data: Customer): Promise<void> {
  await dynamicUpload(`customers/${id}`, data, 'PUT')
}

/**
 * Deletes a Customer
 */
export async function deleteCustomer(id: string): Promise<void> {
  await dynamicDelete(`customers/${id}`)
}
