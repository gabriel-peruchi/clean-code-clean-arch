import { HttpServer } from './HttpServer'
import { CalculateRide } from '../../application/useCases/CalculateRide'

// Interface adapter
export class RideController {
  constructor(
    readonly httpServer: HttpServer,
    readonly calculateRide: CalculateRide
  ) {
    this.register()
  }

  private register() {
    this.httpServer.on('post', '/rides/calculate-ride', async (param: any, body: any) => {
      return await this.calculateRide.execute(body)
    })
  }
}