import { HttpClient } from "../http/HttpClient";
import { AccountGateway, Driver, Passenger } from "../../application/gateways/AccountGateway";

export class AccountGatewayHttp implements AccountGateway {
  constructor(readonly httpClient: HttpClient) { }

  async getDriver(driverId: string): Promise<Driver> {
    return await this.httpClient.get(`http://localhost:3335/drivers/${driverId}`)
  }

  async getPassenger(passengerId: string): Promise<Passenger> {
    return await this.httpClient.get(`http://localhost:3335/passengers/${passengerId}`)
  }

  async createPassenger(input: any): Promise<any> {
    return await this.httpClient.post('http://localhost:3335/passengers', input)
  }

  async createDriver(input: any): Promise<any> {
    return await this.httpClient.post('http://localhost:3335/drivers', input)
  }
}