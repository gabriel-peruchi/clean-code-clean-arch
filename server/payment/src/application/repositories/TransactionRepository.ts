import { Transaction } from "../../domain/transaction/Transaction"

export interface TransactionRepository {
  create(transaction: Transaction): Promise<void>
  findById(transactionId: string): Promise<Transaction>
}