import { DriverRepository } from "../repositories/DriverRepository";
import { PassengerRepository } from "../repositories/PassengerRepository";

// abstract factory
export interface RepositoryFactory {
  createPassengerRepository(): PassengerRepository
  createDriverRepository(): DriverRepository
}