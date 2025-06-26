export async function apiFetch(url, options = {}) {
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {})
    },
    credentials: 'include',
    ...options
  })
  if (!res.ok) {
    let errorMsg = 'API Error'
    try {
      const error = await res.json()
      errorMsg = error.message || errorMsg
    } catch {
      errorMsg = 'Unexpected error occurred'
    }
    throw new Error(errorMsg)
  }
  return res.json()
}