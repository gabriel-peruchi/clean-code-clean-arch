import { CalculateRide } from "../useCases/CalculateRide"
import { RequestRide } from "../useCases/RequestRide"
import { RepositoryFactory } from "./RepositoryFactory"

export class UseCaseFactory {
  constructor(readonly repositoryFactory: RepositoryFactory) { }

  createCalculateRide() {
    return new CalculateRide()
  }

  createRequestRide() {
    return new RequestRide(this.repositoryFactory.createRideRepository())
  }
}