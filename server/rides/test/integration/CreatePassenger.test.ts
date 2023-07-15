import { CreatePassenger } from "../../src/application/useCases/CreatePassenger"
import { PassengerRepositoryDatabase } from "../../src/infra/repositories/PassengerRepositoryDatabase"

it('should create a passenger an return id', async () => {
  const input = {
    name: 'Gabriel',
    document: '83432616074',
    email: 'gabriel@hotmail.com'
  }
  const createPassenger = new CreatePassenger(new PassengerRepositoryDatabase())
  const output = await createPassenger.execute(input)
  expect(output.passengerId).toBeDefined()
})
