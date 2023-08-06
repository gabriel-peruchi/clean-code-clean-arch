import { RepositoryFactory } from "../../application/factory/RepositoryFactory"
import { DriverRepository } from "../../application/repositories/DriverRepository";
import { PassengerRepository } from "../../application/repositories/PassengerRepository";
import { RideRepository } from "../../application/repositories/RideRepository";
import { DatabaseConnection } from "../database/DatabaseConnection";
import { DriverRepositoryDatabase } from "../repositories/DriverRepositoryDatabase";
import { PassengerRepositoryDatabase } from "../repositories/PassengerRepositoryDatabase";
import { RideRepositoryDatabase } from "../repositories/RideRepositoryDatabase";

export class RepositoryDatabaseFactory implements RepositoryFactory {
  constructor(readonly connection: DatabaseConnection) { }

  createPassengerRepository(): PassengerRepository {
    return new PassengerRepositoryDatabase(this.connection)
  }

  createDriverRepository(): DriverRepository {
    return new DriverRepositoryDatabase(this.connection)
  }

  createRideRepository(): RideRepository {
    return new RideRepositoryDatabase(this.connection)
  }
}