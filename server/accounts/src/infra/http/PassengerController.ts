import { UseCaseFactory } from '../../application/factory/UseCaseFactory'
import { HttpServer } from './HttpServer'

// Interface adapter
export class PassengerController {
  constructor(readonly httpServer: HttpServer, readonly useCaseFactory: UseCaseFactory) {
    this.register()
  }

  private register() {
    this.httpServer.on('post', "/passengers", async (params: any, body: any) => {
      return await this.useCaseFactory.createCreatePassenger().execute(body)

    })

    this.httpServer.on('get', "/passengers/:passengerId", async (params: any, body: any) => {
      return await this.useCaseFactory.createGetPassenger().execute({ passengerId: params.passengerId })
    })
  }
}