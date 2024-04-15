import { trimStrings } from '@/utils/strings.ts'

async function handleError(res: Response) {
  const responseMessage = await res.text()
  const errorMessage = `Status: ${res.status}, Message: ${responseMessage}`
  throw new Error(errorMessage)
}

/**
 * Fetches data from the specified URL using the fetch API and parses it as JSON.
 * If the response is not successful (HTTP status code other than 2xx),
 * an error will be thrown with the response text as the error message.
 *
 * @template T - The type of data expected in the response.
 */
export async function dynamicFetch<T>(url: string): Promise<T> {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/${url}`)
  if (!response.ok) {
    await handleError(response)
  }
  return response.json()
}

/**
 * Posts or Updates data from the specified URL using the fetch API.
 * If the response is not successful (HTTP status code other than 2xx),
 * an error will be thrown with the response text as the error message.
 *
 */
export async function dynamicUpload(url: string, data: any, method: 'PUT' | 'POST'): Promise<void> {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/${url}`, {
    method: method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(trimStrings(data))
  })
  if (!response.ok) {
    await handleError(response)
  }
}

/**
 * Deletes data from the specified URL using the fetch API.
 * If the response is not successful (HTTP status code other than 2xx),
 * an error will be thrown with the response text as the error message.
 *
 */
export async function dynamicDelete(url: string) {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/${url}`, {
    method: 'DELETE'
  })
  if (!response.ok) {
    await handleError(response)
  }
}
