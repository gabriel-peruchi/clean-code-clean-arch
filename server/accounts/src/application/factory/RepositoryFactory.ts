import { DriverRepository } from "../repositories/DriverRepository";
import { PassengerRepository } from "../repositories/PassengerRepository";
import { UserRepository } from "../repositories/UserRepository";

// abstract factory
export interface RepositoryFactory {
  createPassengerRepository(): PassengerRepository
  createDriverRepository(): DriverRepository
  createUserRepository(): UserRepository
}