import { CreatePassenger } from "../../src/application/useCases/CreatePassenger"
import { GetPassenger } from "../../src/application/useCases/GetPassenger"
import { PassengerRepositoryDatabase } from "../../src/infra/repositories/PassengerRepositoryDatabase"

it('should get a passenger', async () => {
  const input = {
    name: 'Gabriel',
    document: '83432616074',
    email: 'gabriel@hotmail.com'
  }
  const createPassenger = new CreatePassenger(new PassengerRepositoryDatabase())
  const outputCreatePassenger = await createPassenger.execute(input)
  const getPassenger = new GetPassenger(new PassengerRepositoryDatabase())
  const outputGetPassenger = await getPassenger.execute({ passengerId: outputCreatePassenger.passengerId })
  expect(outputGetPassenger.id).toBe(outputCreatePassenger.passengerId)
  expect(outputGetPassenger.name).toBe(input.name)
  expect(outputGetPassenger.email).toBe(input.email)
  expect(outputGetPassenger.document).toBe(input.document)
})