import { RideRepository } from "../repositories/RideRepository";

// abstract factory
export interface RepositoryFactory {
  createRideRepository(): RideRepository
}