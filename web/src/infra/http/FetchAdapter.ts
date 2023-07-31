import { HttpClient } from "./HttpClient"

export class FetchAdapter implements HttpClient {
  async get(url: string) {
    const response = await fetch(url)
    return await response.json()
  }

  async post(url: string, body: any) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
    return await response.json()
  }
}