import { TransactionRepository } from "../repositories/TransactionRepository"

type GetTransactionInput = {
  transactionId: string
}

type GetTransactionOutput = {
  id: string,
  name: string
  email: string
  amount: number
}

export class GetTransaction {
  constructor(readonly transactionRepository: TransactionRepository) { }

  async execute(input: GetTransactionInput): Promise<GetTransactionOutput> {
    const transaction = await this.transactionRepository.findById(input.transactionId)
    return {
      id: transaction.id,
      name: transaction.name,
      email: transaction.email,
      amount: transaction.amount,
    }
  }
}