import { PgPromiseAdapter } from './infra/database/PgPromiseAdapter'
import { RideController } from './infra/http/RideController'
import { ExpressAdapter } from './infra/http/ExpressAdapter'
import { RepositoryDatabaseFactory } from './infra/factory/RepositoryDatabaseFactory'
import { UseCaseFactory } from './application/factory/UseCaseFactory'

// main composition root
const connection = new PgPromiseAdapter()
const repositoryFactory = new RepositoryDatabaseFactory(connection)
const useCaseFactory = new UseCaseFactory(repositoryFactory)
const httpServer = new ExpressAdapter()
new RideController(httpServer, useCaseFactory)
httpServer.listen(3333, () => console.log('Server is running on port 3333!'))