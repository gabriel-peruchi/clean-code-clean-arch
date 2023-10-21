import { TransactionRepository } from "../repositories/TransactionRepository"

// abstract factory
export interface RepositoryFactory {
  createTransactionRepository(): TransactionRepository
}