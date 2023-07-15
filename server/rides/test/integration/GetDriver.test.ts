import { CreateDriver } from "../../src/application/useCases/CreateDriver"
import { GetDriver } from "../../src/application/useCases/GetDriver"
import { DriverRepositoryDatabase } from "../../src/infra/repositories/DriverRepositoryDatabase"

it('should get a driver', async () => {
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
  expect(outputGetDriver.id).toBe(outputCreateDriver.driverId)
  expect(outputGetDriver.name).toBe(input.name)
  expect(outputGetDriver.email).toBe(input.email)
  expect(outputGetDriver.document).toBe(input.document)
})