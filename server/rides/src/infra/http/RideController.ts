import { HttpServer } from './HttpServer'
import { UseCaseFactory } from '../../application/factory/UseCaseFactory'

// Interface adapter
export class RideController {
  constructor(readonly httpServer: HttpServer, readonly useCaseFactory: UseCaseFactory) {
    this.register()
  }

  private register() {
    this.httpServer.on('post', '/rides/calculate-ride', async (param: any, body: any) => {
      return await this.useCaseFactory.createCalculateRide().execute(body)
    })

    this.httpServer.on('post', '/rides/request-ride', async (param: any, body: any) => {
      return await this.useCaseFactory.createRequestRide().execute(body)
    })
  }
}