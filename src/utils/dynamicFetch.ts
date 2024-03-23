/**
 * Fetches data from the specified URL using the fetch API and parses it as JSON.
 * If the response is not successful (HTTP status code other than 2xx),
 * an error will be thrown with the response text as the error message.
 *
 * @template T - The type of data expected in the response.
 */
export async function dynamicFetch<T>(url: string): Promise<T | undefined> {
  try {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/api/${url}`)
    if (!response.ok) {
      response.text().then((text) => {
        throw new Error(text)
      })
    }
    return response.json()
  } catch (error: any) {
    console.error(error.message)
  }
}
