import pgp from 'pg-promise'

import { DatabaseConnection } from "./DatabaseConnection"

// Frameworks and Drivers
export class PgPromiseAdapter implements DatabaseConnection {
  private connection: any

  constructor() {
    this.connection = pgp()("postgres://postgres:admin@localhost:5432/postgres")
  }

  async query(statement: string, params: any): Promise<any> {
    return await this.connection.query(statement, params)
  }

  async close(): Promise<void> {
    await this.connection.$pool.end()
  }
}