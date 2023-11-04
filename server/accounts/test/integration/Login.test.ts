import { CreatePassenger } from "../../src/application/useCases/CreatePassenger"
import { GetSession } from "../../src/application/useCases/GetSession"
import { Login } from "../../src/application/useCases/Login"
import { PgPromiseAdapter } from "../../src/infra/database/PgPromiseAdapter"
import { PassengerRepositoryDatabase } from "../../src/infra/repositories/PassengerRepositoryDatabase"
import { UserRepositoryDatabase } from "../../src/infra/repositories/UserRepositoryDatabase"

it('should execute a login', async () => {
  const inputCreatePassenger = {
    name: 'Gabriel',
    document: '83432616074',
    email: 'gabriel@hotmail.com',
    password: '123456'
  }
  const connection = new PgPromiseAdapter()
  const createPassenger = new CreatePassenger(new PassengerRepositoryDatabase(connection), new UserRepositoryDatabase(connection))
  await createPassenger.execute(inputCreatePassenger)
  const inputLogin = {
    email: 'gabriel@hotmail.com',
    password: '123456'
  }
  const login = new Login(new UserRepositoryDatabase(connection))
  const outputLogin = await login.execute(inputLogin)
  expect(outputLogin.token).toBeDefined()
  await connection.close()
})

it('should validate if user is logged', async () => {
  const inputCreatePassenger = {
    name: 'Gabriel',
    document: '83432616074',
    email: 'gabriel@hotmail.com',
    password: '123456'
  }
  const connection = new PgPromiseAdapter()
  const createPassenger = new CreatePassenger(new PassengerRepositoryDatabase(connection), new UserRepositoryDatabase(connection))
  await createPassenger.execute(inputCreatePassenger)
  const inputLogin = {
    email: 'gabriel@hotmail.com',
    password: '123456'
  }
  const login = new Login(new UserRepositoryDatabase(connection))
  const outputLogin = await login.execute(inputLogin)
  const getSession = new GetSession()
  const outputGetSession = await getSession.execute({ token: outputLogin.token })
  expect(outputGetSession.email).toBe('gabriel@hotmail.com')
  await connection.close()
})