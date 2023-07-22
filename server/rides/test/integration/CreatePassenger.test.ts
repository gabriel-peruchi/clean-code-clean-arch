import { CreatePassenger } from '../../src/application/useCases/CreatePassenger'
import { PgPromiseAdapter } from '../../src/infra/database/PgPromiseAdapter'
import { PassengerRepositoryDatabase } from '../../src/infra/repositories/PassengerRepositoryDatabase'

it('should create a passenger an return id', async () => {
  const input = {
    name: 'Gabriel',
    document: '83432616074',
    email: 'gabriel@hotmail.com'
  }
  const connection = new PgPromiseAdapter()
  const createPassenger = new CreatePassenger(new PassengerRepositoryDatabase(connection))
  const output = await createPassenger.execute(input)
  expect(output.passengerId).toBeDefined()
  await connection.close()
})
