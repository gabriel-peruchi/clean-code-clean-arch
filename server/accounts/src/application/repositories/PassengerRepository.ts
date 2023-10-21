import { Passenger } from "../../domain/passenger/Passenger"

export interface PassengerRepository {
  create(passenger: Passenger): Promise<void>
  findById(passengerId: string): Promise<Passenger>
}