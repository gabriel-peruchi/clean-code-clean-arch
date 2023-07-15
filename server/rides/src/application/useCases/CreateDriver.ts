import crypto from 'node:crypto'

import { validate } from '../../CpfValidator'
import { DriverRepository } from '../repositories/DriverRepository'

type CreateDriverInput = {
  name: string
  email: string
  document: string
  carPlate: string
}

type CreateDriverOutput = {
  driverId: string
}

export class CreateDriver {
  constructor(readonly driverRepository: DriverRepository) { }

  async execute(input: CreateDriverInput): Promise<CreateDriverOutput> {
    const driverId = crypto.randomUUID()
    if (!validate(input.document)) throw new Error("Invalid cpf")
    await this.driverRepository.create(Object.assign(input, { id: driverId }))
    return { driverId }
  }
}
