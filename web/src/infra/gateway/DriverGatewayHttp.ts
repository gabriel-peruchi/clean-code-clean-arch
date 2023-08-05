import { CreateDriverInput, DriverGateway } from "./DriverGateway"
import { HttpClient } from "../http/HttpClient"
import { Driver } from "../../domain/Driver"

export class DriverGatewayHttp implements DriverGateway {
  constructor(readonly httpClient: HttpClient) {}

  async create(driver: Driver): Promise<string> {
    const input: CreateDriverInput = {
      id: driver.id,
      name: driver.name.getValue(),
      email: driver.email.getValue(),
      carPlate: driver.carPlate.getValue(),
      document: driver.document.getValue(),
    }
    const data = await this.httpClient.post('http://localhost:3333/drivers', input)
    return data.driverId
  }
}