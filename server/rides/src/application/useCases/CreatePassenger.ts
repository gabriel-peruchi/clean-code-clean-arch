import { PassengerRepository } from '../repositories/PassengerRepository'
import { Passenger } from '../../domain/Passenger'

type CreatePassengerInput = {
  name: string
  email: string
  document: string
}

type CreatePassengerOutput = {
  passengerId: string
}

export class CreatePassenger {
  constructor(readonly passengerRepository: PassengerRepository) { }

  async execute(input: CreatePassengerInput): Promise<CreatePassengerOutput> {
    const passenger = Passenger.create(input.name, input.email, input.document)
    await this.passengerRepository.create(passenger)
    return { passengerId: passenger.id }
  }
}
