import { PassengerRepository } from '../repositories/PassengerRepository'

type GetPassengerInput = {
  passengerId: string
}

type GetPassengerOutput = {
  id: string
  name: string
  email: string
  document: string
}

export class GetPassenger {
  constructor(readonly passengerRepository: PassengerRepository) { }

  async execute({ passengerId }: GetPassengerInput): Promise<GetPassengerOutput> {
    const passenger = await this.passengerRepository.findById(passengerId)
    return {
      id: passenger.id,
      name: passenger.name,
      email: passenger.email,
      document: passenger.document
    }
  }
}
