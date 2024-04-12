/**
 * Fetches data from the specified URL using the fetch API and parses it as JSON.
 * If the response is not successful (HTTP status code other than 2xx),
 * an error will be thrown with the response text as the error message.
 *
 * @template T - The type of data expected in the response.
 */
export async function dynamicFetch<T>(url: string): Promise<T | undefined> {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/${url}`)
  if (!response.ok) {
    const errorMessage = `Status: ${response.status}`
    throw new Error(errorMessage)
  }
  return response.json()
}

/**
 * Post data from the specified URL using the fetch API.
 * If the response is not successful (HTTP status code other than 2xx),
 * an error will be thrown with the response text as the error message.
 *
 */
export async function dynamicPost(url: string, data: any) {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  if (!response.ok) {
    console.error(response)
    const errorMessage = `Status: ${response.status}`
    throw new Error(errorMessage)
  }
}
