import type { ExpenseInterface } from '../types/types'
import { dynamicDelete, dynamicFetch, dynamicPost, dynamicUpdate } from '../utils/dynamicFetch.ts'

/**
 * Fetches an Expense
 */
export async function getExpense(id: string): Promise<ExpenseInterface> {
  return await dynamicFetch(`expenses/${id}`)
}

/**
 * Fetches all Expenses
 */
export async function getExpenses(): Promise<ExpenseInterface[]> {
  return await dynamicFetch('expenses')
}

/**
 * Posts an Expense
 */
export async function postExpense(data: ExpenseInterface): Promise<void> {
  await dynamicPost('expenses', data)
}

/**
 * Updates an Expense
 */
export async function updateExpense(id: string, data: ExpenseInterface): Promise<void> {
  await dynamicUpdate(`expenses/${id}`, data)
}

/**
 * Deletes an Expense
 */
export async function deleteExpense(id: string): Promise<void> {
  await dynamicDelete(`expenses/${id}`)
}
