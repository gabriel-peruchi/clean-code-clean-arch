import { PassengerRepository } from '../repositories/PassengerRepository'
import { UserRepository } from '../repositories/UserRepository'

type GetPassengerInput = {
  passengerId: string
}

type GetPassengerOutput = {
  id: string
  name: string
  email: string
  document: string
  userId: string
}

export class GetPassenger {
  constructor(
    readonly passengerRepository: PassengerRepository,
    readonly userRepository: UserRepository,
  ) { }

  async execute({ passengerId }: GetPassengerInput): Promise<GetPassengerOutput> {
    const passenger = await this.passengerRepository.findById(passengerId)
    const user = await this.userRepository.findByEmail(passenger.email.value)
    return {
      id: passenger.id,
      name: passenger.name,
      email: passenger.email.value,
      document: passenger.document.value,
      userId: user.id
    }
  }
}
