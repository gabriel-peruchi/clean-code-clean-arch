import { Passenger } from "../../domain/Passenger"

export interface PassengerGateway {
  create(passenger: Passenger): Promise<string>
}