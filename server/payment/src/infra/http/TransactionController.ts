import { GetTransaction } from '../../application/useCases/GetTransaction'
import { ProcessPayment } from '../../application/useCases/ProcessPayment'
import { HttpServer } from './HttpServer'

// Interface adapter
export class TransactionController {
  constructor(
    readonly httpServer: HttpServer, 
    readonly processPayment: ProcessPayment,
    readonly getTransaction: GetTransaction,
  ) {
    this.register()
  }

  private register() {
    this.httpServer.on('post', '/transactions', async (param: any, body: any) => {
      return await this.processPayment.execute(body)
    })

    this.httpServer.on('get', '/transactions/:transactionId', async (param: any) => {
      return await this.getTransaction.execute({ transactionId: param.transactionId })
    })
  }
}