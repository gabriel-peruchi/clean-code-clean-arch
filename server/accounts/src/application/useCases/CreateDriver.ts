import { DriverRepository } from '../repositories/DriverRepository'
import { Driver } from '../../domain/driver/Driver'

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
    const driver = Driver.create(input.name, input.email, input.document, input.carPlate)
    await this.driverRepository.create(driver)
    return { driverId: driver.id }
  }
}
