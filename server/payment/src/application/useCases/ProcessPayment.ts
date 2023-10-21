import { Transaction } from "../../domain/transaction/Transaction"
import { PaymentGateway } from "../gateways/PaymentGateway"
import { TransactionRepository } from "../repositories/TransactionRepository"

type ProcessPaymentInput = {
  name: string
  email: string
  amount: number
}

type ProcessPaymentOutput = {
  transactionId: string
}

export class ProcessPayment {
  constructor(
    readonly transactionRepository: TransactionRepository,
    readonly paymentGateway: PaymentGateway
  ) { }

  async execute(input: ProcessPaymentInput): Promise<ProcessPaymentOutput> {
    const { transactionId } = await this.paymentGateway.createTransaction(input)
    const transaction = new Transaction(transactionId, input.name, input.email, input.amount)
    await this.transactionRepository.create(transaction)
    return { transactionId }
  }
}