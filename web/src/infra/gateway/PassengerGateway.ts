import { Passenger } from "../../domain/Passenger"

export interface PassengerGateway {
  create(passenger: Passenger): Promise<string>
}

export type CreatePassengerInput = {
  name: string
  email: string
  document: string
}