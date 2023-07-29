import { Passenger } from '../../domain/passenger/Passenger'
import { DatabaseConnection } from '../database/DatabaseConnection'
import { PassengerRepository } from "../../application/repositories/PassengerRepository"

// Interface Adapter
export class PassengerRepositoryDatabase implements PassengerRepository {
  constructor(readonly connection: DatabaseConnection) {}
  
  async create(passenger: Passenger): Promise<void> {
    await this.connection.query("insert into ccca.passengers (id, name, email, document) values ($1, $2, $3, $4)", [passenger.id, passenger.name, passenger.email.value, passenger.document.value])
  }
  
  async findById(passengerId: string): Promise<Passenger> {
    const [passengerData] = await this.connection.query("select * from ccca.passengers where id = $1", [passengerId])
    return new Passenger(passengerData.id, passengerData.name, passengerData.email, passengerData.document)
  }
}