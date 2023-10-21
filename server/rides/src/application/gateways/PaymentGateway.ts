export type Input = {
  name: string
  email: string
  amount: number
}

export interface PaymentGateway {
  createTransaction(input: Input): Promise<void>
}

