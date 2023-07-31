import { DriverGateway } from "./DriverGateway"
import { HttpClient } from "../http/HttpClient"
import { Driver } from "../../domain/Driver"

export class DriverGatewayHttp implements DriverGateway {
  constructor(readonly httpClient: HttpClient) {}

  async create(driver: Driver): Promise<string> {
    const data = await this.httpClient.post('http://localhost:3333/drivers', driver)
    return data.driverId
  }
}