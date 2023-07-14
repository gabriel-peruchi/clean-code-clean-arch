import { CreateDriver } from "../../src/application/useCases/CreateDriver"

it('should create a driver an return id', async () => {
  const input = {
    name: 'Gabriel',
    document: '83432616074',
    email: 'gabriel@hotmail.com',
    carPlate: 'AAA9999'
  }
  const createDriver = new CreateDriver()
  const output = await createDriver.execute(input)
  expect(output.driverId).toBeDefined()
})
