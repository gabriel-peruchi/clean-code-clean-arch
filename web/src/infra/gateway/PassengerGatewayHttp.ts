import { Passenger } from "../../domain/Passenger"
import { HttpClient } from "../http/HttpClient"
import { PassengerGateway } from "./PassengerGateway"

export class PassengerGatewayHttp implements PassengerGateway {
  constructor(readonly httpClient: HttpClient) {}

  async create(passenger: Passenger): Promise<string> {
    const data = await this.httpClient.post('http://localhost:3333/passengers', passenger)
    return data.passengerId
  }
}