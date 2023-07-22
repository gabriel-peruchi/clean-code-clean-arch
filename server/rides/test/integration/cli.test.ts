import { CreatePassenger } from "../../src/application/useCases/CreatePassenger"
import { CliController } from "../../src/infra/cli/CliController"
import { InputOutputHandler } from "../../src/infra/cli/InputOutputHandler"
import { PgPromiseAdapter } from "../../src/infra/database/PgPromiseAdapter"
import { PassengerRepositoryDatabase } from "../../src/infra/repositories/PassengerRepositoryDatabase"

it('should create a passenger by cli', async () => {
  const output: any = []
  const connection = new PgPromiseAdapter()
  const passenngerRepository = new PassengerRepositoryDatabase(connection)
  const createPassenger = new CreatePassenger(passenngerRepository)
  const inputOutputHandler = new class extends InputOutputHandler {
    write(text: string) {
      output.push(JSON.parse(text))
    }
  }
  new CliController(inputOutputHandler, createPassenger)
  await inputOutputHandler.type('create-passenger gabriel gabriel@gmail.com 83432616074')
  expect(output.at(0)?.passengerId).toBeDefined()
  await connection.close()
})