import crypto from 'node:crypto'

import { validate } from '../../CpfValidator'
import { PassengerRepository } from '../repositories/PassengerRepository'

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
    const passengerId = crypto.randomUUID()
    if (!validate(input.document)) throw new Error("Invalid cpf")
    await this.passengerRepository.create(Object.assign(input, { id: passengerId }))
    return { passengerId }
  }
}
