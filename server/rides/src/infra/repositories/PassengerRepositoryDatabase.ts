import pgp from 'pg-promise'

import { PassengerRepository } from "../../application/repositories/PassengerRepository";

export class PassengerRepositoryDatabase implements PassengerRepository {
  async create(passenger: any): Promise<void> {
    const connection = pgp()("postgres://postgres:admin@localhost:5432/postgres")
    await connection.query("insert into passengers (id, name, email, document) values ($1, $2, $3, $4)", [passenger.id, passenger.name, passenger.email, passenger.document])
    await connection.$pool.end()
  }
  
  async findById(passengerId: any): Promise<any> {
    const connection = pgp()("postgres://postgres:admin@localhost:5432/postgres")
    const [passengerData] = await connection.query("select * from passengers where id = $1", [passengerId])
    await connection.$pool.end()
    return {
      id: passengerData.id,
      name: passengerData.name,
      email: passengerData.email,
      document: passengerData.document
    }
  }
}