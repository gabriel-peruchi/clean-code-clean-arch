import { DriverRepository } from '../repositories/DriverRepository'

type GetDriverInput = {
  driverId: string
}

type GetDriverOutput = {
  id: string
  name: string
  email: string
  document: string
  carPlate: string
}

export class GetDriver {
  constructor(readonly driverRepository: DriverRepository) { }

  async execute({ driverId }: GetDriverInput): Promise<GetDriverOutput> {
    const driver = await this.driverRepository.findById(driverId)
    return {
      id: driver.id,
      name: driver.name,
      email: driver.email,
      document: driver.document,
      carPlate: driver.carPlate
    }
  }
}
