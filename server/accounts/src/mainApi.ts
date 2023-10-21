import { PgPromiseAdapter } from './infra/database/PgPromiseAdapter'
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
new DriverController(httpServer, useCaseFactory)
new PassengerController(httpServer, useCaseFactory)
httpServer.listen(3335, () => console.log('Server is running on port 3335!'))