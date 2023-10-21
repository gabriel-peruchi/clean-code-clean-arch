import { HttpClient } from "../http/HttpClient";
import { Input, PaymentGateway } from "../../application/gateways/PaymentGateway";

export class PaymentGatewayHttp implements PaymentGateway {
  constructor(readonly httpClient: HttpClient) {}

  async createTransaction(input: Input): Promise<void> {
    await this.httpClient.post('http://localhost:3334/transactions', input)
  }
}