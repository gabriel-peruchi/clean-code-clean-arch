import pgp from 'pg-promise'

import { PassengerRepository } from "../../application/repositories/PassengerRepository";
import { Passenger } from '../../domain/Passenger';

export class PassengerRepositoryDatabase implements PassengerRepository {
  async create(passenger: Passenger): Promise<void> {
    const connection = pgp()("postgres://postgres:admin@localhost:5432/postgres")
    await connection.query("insert into passengers (id, name, email, document) values ($1, $2, $3, $4)", [passenger.id, passenger.name, passenger.email.value, passenger.document.value])
    await connection.$pool.end()
  }
  
  async findById(passengerId: string): Promise<Passenger> {
    const connection = pgp()("postgres://postgres:admin@localhost:5432/postgres")
    const [passengerData] = await connection.query("select * from passengers where id = $1", [passengerId])
    await connection.$pool.end()
    return new Passenger(passengerData.id, passengerData.name, passengerData.email, passengerData.document)
  }
}