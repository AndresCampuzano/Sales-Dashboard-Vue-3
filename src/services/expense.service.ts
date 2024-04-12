import type { ExpenseInterface } from '../types/types'
import { dynamicFetch, dynamicPost } from '../utils/dynamicFetch.ts'

/**
 * Fetches an Expense
 */
export async function getExpense(id: string): Promise<ExpenseInterface | undefined> {
  return await dynamicFetch(`expenses/${id}`)
}

/**
 * Fetches all Expenses
 */
export async function getExpenses(): Promise<ExpenseInterface[] | []> {
  return (await dynamicFetch('expenses')) as ExpenseInterface[] | []
}

/**
 * Posts an Expense
 */
export async function postExpense(data: ExpenseInterface): Promise<void> {
  await dynamicPost('expenses', data)
  // await fetch(`${import.meta.env.VITE_API_URL}/api/expenses`, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify(data)
  // })
}

/**
 * Updates an Expense
 */
export async function updateExpense(id: string, data: ExpenseInterface): Promise<void> {
  await fetch(`${import.meta.env.VITE_API_URL}/api/expenses/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
}

/**
 * Deletes an Expense
 */
export async function deleteExpense(id: string): Promise<void> {
  await fetch(`${import.meta.env.VITE_API_URL}/api/expenses/${id}`, {
    method: 'DELETE'
  })
}
