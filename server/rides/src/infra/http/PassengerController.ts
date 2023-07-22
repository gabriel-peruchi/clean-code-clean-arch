import { CreatePassenger } from '../../application/useCases/CreatePassenger'
import { GetPassenger } from '../../application/useCases/GetPassenger'
import { HttpServer } from './HttpServer'

// Interface adapter
export class PassengerController {
  constructor(
    readonly httpServer: HttpServer,
    readonly createPassenger: CreatePassenger,
    readonly getPassenger: GetPassenger,
  ) {
    this.register()
  }

  private register() {
    this.httpServer.on('post', "/passengers", async (params: any, body: any) => {
      return await this.createPassenger.execute(body)

    })

    this.httpServer.on('get', "/passengers/:passengerId", async (params: any, body: any) => {
      return await this.getPassenger.execute({ passengerId: params.passengerId })
    })
  }
}