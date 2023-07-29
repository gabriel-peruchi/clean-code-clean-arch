import { Driver } from '../../domain/driver/Driver'
import { DatabaseConnection } from '../database/DatabaseConnection'
import { DriverRepository } from "../../application/repositories/DriverRepository"

// Interface Adapter
export class DriverRepositoryDatabase implements DriverRepository {
  constructor(readonly connection: DatabaseConnection) {}

  async create(driver: Driver): Promise<void> {
    await this.connection.query("insert into drivers (id, name, email, document, car_plate) values ($1, $2, $3, $4, $5)", [driver.id, driver.name, driver.email.value, driver.document.value, driver.carPlate.value])
  }
  
  async findById(driverId: string): Promise<Driver> {
    const [driverData] = await this.connection.query("select * from drivers where id = $1", [driverId])
    return new Driver(driverData.id, driverData.name, driverData.email, driverData.document, driverData.car_plate)
  }
}
