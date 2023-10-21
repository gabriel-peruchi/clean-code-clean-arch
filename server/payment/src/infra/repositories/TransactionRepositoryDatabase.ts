import { TransactionRepository } from "../../application/repositories/TransactionRepository"
import { Transaction } from "../../domain/transaction/Transaction"
import { DatabaseConnection } from "../database/DatabaseConnection"

export class TransactionRepositoryDatabase implements TransactionRepository {
  constructor(readonly connection: DatabaseConnection) { }

  async create(transaction: Transaction): Promise<void> {
    await this.connection.query(
      "insert into ccca.transactions (id, name, email, amount) values ($1, $2, $3, $4)",
      [transaction.id, transaction.name, transaction.email, transaction.amount]
    )
  }

  async findById(transactionId: string): Promise<Transaction> {
    const [transactionData] = await this.connection.query("select * from ccca.transactions where id = $1", [transactionId])
    return new Transaction(
      transactionData.id,
      transactionData.name,
      transactionData.email,
      parseFloat(transactionData.amount)
    )
  }
}
