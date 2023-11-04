import { RepositoryFactory } from "../../application/factory/RepositoryFactory"
import { DriverRepository } from "../../application/repositories/DriverRepository";
import { PassengerRepository } from "../../application/repositories/PassengerRepository";
import { UserRepository } from "../../application/repositories/UserRepository";
import { DatabaseConnection } from "../database/DatabaseConnection";
import { DriverRepositoryDatabase } from "../repositories/DriverRepositoryDatabase";
import { PassengerRepositoryDatabase } from "../repositories/PassengerRepositoryDatabase";
import { UserRepositoryDatabase } from "../repositories/UserRepositoryDatabase";

export class RepositoryDatabaseFactory implements RepositoryFactory {
  constructor(readonly connection: DatabaseConnection) { }

  createPassengerRepository(): PassengerRepository {
    return new PassengerRepositoryDatabase(this.connection)
  }

  createDriverRepository(): DriverRepository {
    return new DriverRepositoryDatabase(this.connection)
  }

  createUserRepository(): UserRepository {
    return new UserRepositoryDatabase(this.connection)
  }
}