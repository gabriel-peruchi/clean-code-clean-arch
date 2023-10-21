import { HttpServer } from './HttpServer'
import { UseCaseFactory } from '../../application/factory/UseCaseFactory';

// Interface adapter
export class DriverController {
  constructor(readonly httpServer: HttpServer, readonly useCaseFactory: UseCaseFactory) {
    this.register()
  }

  private register() {
    this.httpServer.on('post', "/drivers", async (params: any, body: any) => {
      return await this.useCaseFactory.createCreateDriver().execute(body)
    })

    this.httpServer.on('get', "/drivers/:driverId", async (params: any, body: any) => {
      return await this.useCaseFactory.createGetDriver().execute({ driverId: params.driverId })
    })
  }
}