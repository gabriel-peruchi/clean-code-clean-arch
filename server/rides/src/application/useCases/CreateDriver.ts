import pgp from 'pg-promise'
import crypto from 'node:crypto'

import { validate } from '../../CpfValidator'

type CreateDriverInput = {
  name: string
  email: string
  document: string
  carPlate: string
}

type CreateDriverOutput = {
  driverId: string
}

export class CreateDriver {
  constructor() { }

  async execute(input: CreateDriverInput): Promise<CreateDriverOutput> {
    const connection = pgp()("postgres://postgres:admin@localhost:5432/postgres")
    const driverId = crypto.randomUUID()
    if (!validate(input.document)) throw new Error("Invalid cpf")
    await connection.query("insert into drivers (id, name, email, document, car_plate) values ($1, $2, $3, $4, $5)", [driverId, input.name, input.email, input.document, input.carPlate])
    await connection.$pool.end()
    return { driverId }
  }
}
