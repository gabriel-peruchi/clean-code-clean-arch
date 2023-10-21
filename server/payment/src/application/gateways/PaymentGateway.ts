export type Input = {
  name: string
  email: string
  amount: number
}

export type Output = {
  transactionId: string
}

export interface PaymentGateway {
  createTransaction(input: Input): Promise<Output>
}

