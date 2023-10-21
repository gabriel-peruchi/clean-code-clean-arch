import axios from "axios";
import { HttpClient } from "./HttpClient"

export class AxiosAdapter implements HttpClient {
  async get(url: string) {
    const response = await axios.get(url)
    return response.data
  }

  async post(url: string, body: any) {
    const response = await axios.post(url, body)
    return response.data
  }
}