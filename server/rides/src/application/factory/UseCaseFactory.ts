import { CalculateRide } from "../useCases/CalculateRide"
import { CreateDriver } from "../useCases/CreateDriver"
import { CreatePassenger } from "../useCases/CreatePassenger"
import { GetDriver } from "../useCases/GetDriver"
import { GetPassenger } from "../useCases/GetPassenger"
import { RequestRide } from "../useCases/RequestRide"
import { RepositoryFactory } from "./RepositoryFactory"

export class UseCaseFactory {
  constructor(readonly repositoryFactory: RepositoryFactory) { }

  createCalculateRide() {
    return new CalculateRide()
  }

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

  createRequestRide() {
    return new RequestRide(this.repositoryFactory.createRideRepository())
  }
}