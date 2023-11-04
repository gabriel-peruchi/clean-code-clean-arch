import { PassengerRepository } from '../repositories/PassengerRepository'
import { Passenger } from '../../domain/passenger/Passenger'
import { PasswordTypeEnum, User } from '../../domain/user/User'
import { UserRepository } from '../repositories/UserRepository'

type CreatePassengerInput = {
  name: string
  email: string
  document: string
  password?: string
}

type CreatePassengerOutput = {
  passengerId: string
}

export class CreatePassenger {
  constructor(
    readonly passengerRepository: PassengerRepository,
    readonly userRepository: UserRepository,
  ) { }

  async execute(input: CreatePassengerInput): Promise<CreatePassengerOutput> {
    const passenger = Passenger.create(input.name, input.email, input.document)
    await this.passengerRepository.create(passenger)
    if (input.password) {
      try {
        const user = User.create(input.email, input.password, PasswordTypeEnum.PBKDF2)
        await this.userRepository.create(user)
      } catch (error) {
        // await this.passengerRepository.delete(passenger.id)
      }
    }
    return { passengerId: passenger.id }
  }
}
