import { HttpServer } from './HttpServer'
import { CalculateRide } from '../../application/useCases/CalculateRide'
import { RequestRide } from '../../application/useCases/RequestRide'

// Interface adapter
export class RideController {
  constructor(
    readonly httpServer: HttpServer,
    readonly calculateRide: CalculateRide,
    readonly requestRide: RequestRide
  ) {
    this.register()
  }

  private register() {
    this.httpServer.on('post', '/rides/calculate-ride', async (param: any, body: any) => {
      return await this.calculateRide.execute(body)
    })

    this.httpServer.on('post', '/rides/request-ride', async (param: any, body: any) => {
      return await this.requestRide.execute(body)
    })
  }
}