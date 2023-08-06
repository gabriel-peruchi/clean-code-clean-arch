import { DriverRepository } from "../repositories/DriverRepository";
import { PassengerRepository } from "../repositories/PassengerRepository";
import { RideRepository } from "../repositories/RideRepository";

// abstract factory
export interface RepositoryFactory {
  createPassengerRepository(): PassengerRepository
  createDriverRepository(): DriverRepository
  createRideRepository(): RideRepository
}