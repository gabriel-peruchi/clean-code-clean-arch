import { Passenger } from "../../domain/Passenger"

export interface PassengerRepository {
  create(passenger: Passenger): Promise<void>
  findById(passengerId: string): Promise<Passenger>
}