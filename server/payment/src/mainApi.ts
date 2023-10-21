import { PgPromiseAdapter } from './infra/database/PgPromiseAdapter'
import { ExpressAdapter } from './infra/http/ExpressAdapter'
import { ProcessPayment } from './application/useCases/ProcessPayment'
import { TransactionController } from './infra/http/TransactionController'
import { TransactionRepositoryDatabase } from './infra/repositories/TransactionRepositoryDatabase'
import { PayPalGatway } from './infra/gateways/PayPalGateway'
import { GetTransaction } from './application/useCases/GetTransaction'

// main composition root
const connection = new PgPromiseAdapter()
const transactionRepository = new TransactionRepositoryDatabase(connection)
const paymentGateway = new PayPalGatway()
const processPayment = new ProcessPayment(transactionRepository, paymentGateway)
const getTransaction = new GetTransaction(transactionRepository)
const httpServer = new ExpressAdapter()
new TransactionController(httpServer, processPayment, getTransaction)
httpServer.listen(3334, () => console.log('Server is running on port 3334!'))