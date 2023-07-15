import { Driver } from './../../src/domain/Driver'
import { DriverRepository } from '../../src/application/repositories/DriverRepository'
import { CreateDriver } from '../../src/application/useCases/CreateDriver'
import { GetDriver } from '../../src/application/useCases/GetDriver'
import { DriverRepositoryDatabase } from '../../src/infra/repositories/DriverRepositoryDatabase'

// narrow integration test
it('should get a driver', async function () {
  // fake test pattern
  const driverRepository: DriverRepository = {
    async create(driver: Driver): Promise<void> {
    },
    async findById(driverId: string): Promise<Driver> {
      return Driver.create('Gabriel', 'gabriel@hotmail.com', '83432616074', 'AAA9999')
    }
  }
  const input = {
    name: 'Gabriel',
    document: '83432616074',
    email: 'gabriel@hotmail.com',
    carPlate: 'AAA9999'
  }
  const createDriver = new CreateDriver(driverRepository)
  const outputCreateDriver = await createDriver.execute(input)
  const getDriver = new GetDriver(driverRepository)
  const outputGetDriver = await getDriver.execute({ driverId: outputCreateDriver.driverId })
  expect(outputGetDriver.name).toBe(input.name)
  expect(outputGetDriver.email).toBe(input.email)
  expect(outputGetDriver.document).toBe(input.document)
  expect(outputGetDriver.carPlate).toBe(input.carPlate)
})

// broad integration test
it('should get a driver', async function () {
  const input = {
    name: 'Gabriel',
    document: '83432616074',
    email: 'gabriel@hotmail.com',
    carPlate: 'AAA9999'
  }
  const createDriver = new CreateDriver(new DriverRepositoryDatabase())
  const outputCreateDriver = await createDriver.execute(input)
  const getDriver = new GetDriver(new DriverRepositoryDatabase())
  const outputGetDriver = await getDriver.execute({ driverId: outputCreateDriver.driverId })
  expect(outputGetDriver.name).toBe(input.name)
  expect(outputGetDriver.email).toBe(input.email)
  expect(outputGetDriver.document).toBe(input.document)
  expect(outputGetDriver.carPlate).toBe(input.carPlate)
})