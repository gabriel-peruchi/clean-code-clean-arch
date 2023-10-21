import { AcceptRide } from "../../src/application/useCases/AcceptRide"
import { GetRide } from "../../src/application/useCases/GetRide"
import { RequestRide } from "../../src/application/useCases/RequestRide"
import { StartRide } from "../../src/application/useCases/StartRide"
import { PgPromiseAdapter } from "../../src/infra/database/PgPromiseAdapter"
import { AccountGatewayHttp } from "../../src/infra/gateways/AccountGatewayHttp"
import { AxiosAdapter } from "../../src/infra/http/AxiosAdapter"
import { RideRepositoryDatabase } from "../../src/infra/repositories/RideRepositoryDatabase"

it('should start a ride', async () => {
  const inputCreatePassenger = {
    name: 'Gabriel',
    document: '83432616074',
    email: 'gabriel@hotmail.com'
  }
  const connection = new PgPromiseAdapter()
  const accountGateway = new AccountGatewayHttp(new AxiosAdapter())
  const outputCreatePassenger = await accountGateway.createPassenger(inputCreatePassenger)

  const inputRequestRide = {
    passengerId: outputCreatePassenger.passengerId,
    from: {
      lat: -27.584905257808835,
      long: -48.545022195325124,
    },
    to: {
      lat: -27.496887588317275,
      long: -48.522234807851476
    },
    date: new Date('2021-03-01T10:00:00')
  }
  const requestRide = new RequestRide(new RideRepositoryDatabase(connection))
  const outputRequestRide = await requestRide.execute(inputRequestRide)

  const inputCreateDriver = {
    name: 'Gabriel',
    document: '83432616074',
    email: 'gabriel@hotmail.com',
    carPlate: 'AAA9999'
  }
  const outputCreateDriver = await accountGateway.createDriver(inputCreateDriver)

  const inputAcceptRide = {
    rideId: outputRequestRide.rideId,
    driverId: outputCreateDriver.driverId,
    date: new Date('2021-03-01T10:10:00')
  }
  const acceptRide = new AcceptRide(new RideRepositoryDatabase(connection))
  await acceptRide.execute(inputAcceptRide)

  const inputStartRide = {
    rideId: outputRequestRide.rideId,
    date: new Date('2021-03-01T10:20:00')
  }
  const startRide = new StartRide(new RideRepositoryDatabase(connection))
  await startRide.execute(inputStartRide)

  const getRide = new GetRide(new RideRepositoryDatabase(connection), accountGateway)
  const outputGetRide = await getRide.execute({ rideId: outputRequestRide.rideId })
  expect(outputGetRide.status).toBe('in_progress')
  expect(outputGetRide.startDate).toEqual(new Date('2021-03-01T10:20:00'))
  await connection.close()
})