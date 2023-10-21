import { RepositoryFactory } from "../../application/factory/RepositoryFactory"
import { RideRepository } from "../../application/repositories/RideRepository";
import { DatabaseConnection } from "../database/DatabaseConnection";
import { RideRepositoryDatabase } from "../repositories/RideRepositoryDatabase";

export class RepositoryDatabaseFactory implements RepositoryFactory {
  constructor(readonly connection: DatabaseConnection) { }

  createRideRepository(): RideRepository {
    return new RideRepositoryDatabase(this.connection)
  }
}