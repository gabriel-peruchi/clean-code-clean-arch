import { CreatePassenger } from "../../src/application/useCases/CreatePassenger"

it('should create a passenger an return id', async () => {
  const input = {
    name: 'Gabriel',
    document: '83432616074',
    email: 'gabriel@hotmail.com'
  }
  const createPassenger = new CreatePassenger()
  const output = await createPassenger.execute(input)
  expect(output.passengerId).toBeDefined()
})
