import { CreatePassenger } from '../../application/useCases/CreatePassenger'
import { InputOutputHandler } from './InputOutputHandler'

export class CliController {
  constructor(readonly inputOutput: InputOutputHandler, readonly createPassenger: CreatePassenger) {
    this.register()
  }

  private register() {
    this.inputOutput.on('create-passenger', async (params: string) => {
      try {
        const [name, email, document] = params.split(' ')
        const output = await this.createPassenger.execute({ name, email, document })
        this.inputOutput.write(JSON.stringify(output))
      } catch (error: any) {
        this.inputOutput.write(error.message)
      }
    })
  }
}