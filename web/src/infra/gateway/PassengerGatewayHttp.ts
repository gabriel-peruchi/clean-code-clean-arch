import { Passenger } from "../../domain/Passenger"
import { HttpClient } from "../http/HttpClient"
import { CreatePassengerInput, PassengerGateway } from "./PassengerGateway"

export class PassengerGatewayHttp implements PassengerGateway {
  constructor(readonly httpClient: HttpClient) {}

  async create(passenger: Passenger): Promise<string> {
    const input: CreatePassengerInput = {
      name: passenger.name.getValue(),
      email: passenger.email.getValue(),
      document: passenger.document.getValue(),
    }
    const data = await this.httpClient.post('http://localhost:3335/passengers', input)
    return data.passengerId
  }
}