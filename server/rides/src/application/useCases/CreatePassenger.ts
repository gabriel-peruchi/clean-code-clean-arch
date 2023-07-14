import pgp from 'pg-promise'
import crypto from 'node:crypto'

import { validate } from '../../CpfValidator'

type CreatePassengerInput = {
  name: string
  email: string
  document: string
}

type CreatePassengerOutput = {
  passengerId: string
}

export class CreatePassenger {
  constructor() {}

  async execute(input: CreatePassengerInput): Promise<CreatePassengerOutput> {
    const connection = pgp()("postgres://postgres:admin@localhost:5432/postgres")
    const passengerId = crypto.randomUUID()
    if (!validate(input.document)) throw new Error("Invalid cpf")
    await connection.query("insert into passengers (id, name, email, document) values ($1, $2, $3, $4)", [passengerId, input.name, input.email, input.document])
    await connection.$pool.end()
    return { passengerId }
  }
}
