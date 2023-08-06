import { PgPromiseAdapter } from './infra/database/PgPromiseAdapter'
import { RideController } from './infra/http/RideController'
import { DriverController } from './infra/http/DriverController'
import { PassengerController } from './infra/http/PassengerController'
import { ExpressAdapter } from './infra/http/ExpressAdapter'
import { RepositoryDatabaseFactory } from './infra/factory/RepositoryDatabaseFactory'
import { UseCaseFactory } from './application/factory/UseCaseFactory'

// main composition root
const connection = new PgPromiseAdapter()
const repositoryFactory = new RepositoryDatabaseFactory(connection)
const useCaseFactory = new UseCaseFactory(repositoryFactory)
const httpServer = new ExpressAdapter()
new RideController(httpServer, useCaseFactory)
new DriverController(httpServer, useCaseFactory)
new PassengerController(httpServer, useCaseFactory)
httpServer.listen(3333)