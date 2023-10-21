import { CreateDriver } from "../useCases/CreateDriver"
import { CreatePassenger } from "../useCases/CreatePassenger"
import { GetDriver } from "../useCases/GetDriver"
import { GetPassenger } from "../useCases/GetPassenger"
import { RepositoryFactory } from "./RepositoryFactory"

export class UseCaseFactory {
  constructor(readonly repositoryFactory: RepositoryFactory) { }

  createCreateDriver() {
    return new CreateDriver(this.repositoryFactory.createDriverRepository())
  }

  createGetDriver() {
    return new GetDriver(this.repositoryFactory.createDriverRepository())
  }

  createCreatePassenger() {
    return new CreatePassenger(this.repositoryFactory.createPassengerRepository())
  }

  createGetPassenger() {
    return new GetPassenger(this.repositoryFactory.createPassengerRepository())
  }
}