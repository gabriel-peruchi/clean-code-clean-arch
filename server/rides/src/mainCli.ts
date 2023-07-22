import { NodeInputOutputHandler } from './infra/cli/NodeInputOutputHandler';
import { CreatePassenger } from "./application/useCases/CreatePassenger"
import { CliController } from "./infra/cli/CliController"
import { PgPromiseAdapter } from "./infra/database/PgPromiseAdapter"
import { PassengerRepositoryDatabase } from "./infra/repositories/PassengerRepositoryDatabase"

const connection = new PgPromiseAdapter()
const passenngerRepository = new PassengerRepositoryDatabase(connection)
const createPassenger = new CreatePassenger(passenngerRepository)
const nodeInputOutputHandler = new NodeInputOutputHandler()
new CliController(nodeInputOutputHandler, createPassenger)