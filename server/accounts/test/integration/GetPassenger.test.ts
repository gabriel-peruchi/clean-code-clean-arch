import { CreatePassenger } from "../../src/application/useCases/CreatePassenger"
import { GetPassenger } from "../../src/application/useCases/GetPassenger"
import { PgPromiseAdapter } from "../../src/infra/database/PgPromiseAdapter"
import { PassengerRepositoryDatabase } from "../../src/infra/repositories/PassengerRepositoryDatabase"
import { UserRepositoryDatabase } from "../../src/infra/repositories/UserRepositoryDatabase"

it('should get a passenger', async () => {
  const input = {
    name: 'Gabriel',
    document: '83432616074',
    email: 'gabriel@hotmail.com',
    password: '123456'
  }
  const connection = new PgPromiseAdapter()
  const createPassenger = new CreatePassenger(new PassengerRepositoryDatabase(connection), new UserRepositoryDatabase(connection))
  const outputCreatePassenger = await createPassenger.execute(input)
  const getPassenger = new GetPassenger(new PassengerRepositoryDatabase(connection), new UserRepositoryDatabase(connection))
  const outputGetPassenger = await getPassenger.execute({ passengerId: outputCreatePassenger.passengerId })
  expect(outputGetPassenger.id).toBe(outputCreatePassenger.passengerId)
  expect(outputGetPassenger.name).toBe(input.name)
  expect(outputGetPassenger.email).toBe(input.email)
  expect(outputGetPassenger.document).toBe(input.document)
  await connection.close()
})