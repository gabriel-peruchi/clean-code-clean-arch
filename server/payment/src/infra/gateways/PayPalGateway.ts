import crypto from 'node:crypto'
import { Input, Output, PaymentGateway } from "../../application/gateways/PaymentGateway"

export class PayPalGatway implements PaymentGateway {
  async createTransaction(input: Input): Promise<Output> {
    console.log('PayPal implementation', input)
    return { transactionId: crypto.randomUUID() }
  }
}