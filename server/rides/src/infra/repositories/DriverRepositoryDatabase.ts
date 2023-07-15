import pgp from 'pg-promise'

import { DriverRepository } from "../../application/repositories/DriverRepository"
import { Driver } from '../../domain/Driver'

export class DriverRepositoryDatabase implements DriverRepository {
  async create(driver: Driver): Promise<void> {
    const connection = pgp()("postgres://postgres:admin@localhost:5432/postgres")
    await connection.query("insert into drivers (id, name, email, document, car_plate) values ($1, $2, $3, $4, $5)", [driver.id, driver.name, driver.email.value, driver.document.value, driver.carPlate.value])
    await connection.$pool.end()
  }
  
  async findById(driverId: string): Promise<Driver> {
    const connection = pgp()("postgres://postgres:admin@localhost:5432/postgres")
    const [driverData] = await connection.query("select * from drivers where id = $1", [driverId])
    await connection.$pool.end()
    return new Driver(driverData.id, driverData.name, driverData.email, driverData.document, driverData.car_plate)
  }
}