import express, { Request, Response } from 'express'

import { HttpCallback, HttpMethod, HttpServer } from './HttpServer'

// Frameworks and drivers
export class ExpressAdapter implements HttpServer {
  private app: express.Express

  constructor() {
    this.app = express()
    this.app.use(express.json())
  }

  listen(port: number): void {
    this.app.listen(port)
  }

  on(method: HttpMethod, url: string, callback: HttpCallback): void {
    this.app[method](url, async (request: Request, response: Response) => {
      try {
        const output = await callback(request.params, request.body)
        response.json(output)
      } catch (error: any) {
        response.status(422).send(error.message)
      }
    })
  }
}