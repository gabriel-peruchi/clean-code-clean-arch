import { GetDriver } from './../../application/useCases/GetDriver';
import { HttpServer } from './HttpServer'
import { CreateDriver } from '../../application/useCases/CreateDriver'

// Interface adapter
export class DriverController {
  constructor(
    readonly httpServer: HttpServer,
    readonly createDriver: CreateDriver,
    readonly getDriver: GetDriver,
  ) {
    this.register()
  }

  private register() {
    this.httpServer.on('post', "/drivers", async (params: any, body: any) => {
      return await this.createDriver.execute(body)
    })

    this.httpServer.on('get', "/drivers/:driverId", async (params: any, body: any) => {
      return await this.getDriver.execute({ driverId: params.driverId })
    })
  }
}