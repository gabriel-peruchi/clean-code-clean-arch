
import { CalculateRide } from './application/useCases/CalculateRide'
import { CreatePassenger } from './application/useCases/CreatePassenger'
import { GetPassenger } from './application/useCases/GetPassenger'
import { CreateDriver } from './application/useCases/CreateDriver'
import { GetDriver } from './application/useCases/GetDriver'
import { PassengerRepositoryDatabase } from './infra/repositories/PassengerRepositoryDatabase'
import { DriverRepositoryDatabase } from './infra/repositories/DriverRepositoryDatabase'
import { PgPromiseAdapter } from './infra/database/PgPromiseAdapter'
import { RideController } from './infra/http/RideController'
import { DriverController } from './infra/http/DriverController'
import { PassengerController } from './infra/http/PassengerController'
import { ExpressAdapter } from './infra/http/ExpressAdapter'

// main composition root
const connection = new PgPromiseAdapter()
const passengerRepository = new PassengerRepositoryDatabase(connection)
const driverRepository = new DriverRepositoryDatabase(connection)
const calculateRide = new CalculateRide()
const createDriver = new CreateDriver(driverRepository)
const getDriver = new GetDriver(driverRepository)
const createPassenger = new CreatePassenger(passengerRepository)
const getPassenger = new GetPassenger(passengerRepository)
const httpServer = new ExpressAdapter()
new RideController(httpServer, calculateRide)
new DriverController(httpServer, createDriver, getDriver)
new PassengerController(httpServer, createPassenger, getPassenger)
httpServer.listen(3333)