import pgp from 'pg-promise'

import { DriverRepository } from "../../application/repositories/DriverRepository"

export class DriverRepositoryDatabase implements DriverRepository {
  async create(driver: any): Promise<void> {
    const connection = pgp()("postgres://postgres:admin@localhost:5432/postgres")
    await connection.query("insert into drivers (id, name, email, document, car_plate) values ($1, $2, $3, $4, $5)", [driver.id, driver.name, driver.email, driver.document, driver.carPlate])
    await connection.$pool.end()
  }
  
  async findById(driverId: any): Promise<any> {
    const connection = pgp()("postgres://postgres:admin@localhost:5432/postgres")
    const [driverData] = await connection.query("select * from drivers where id = $1", [driverId])
    await connection.$pool.end()
    return {
      id: driverData.id,
      name: driverData.name,
      email: driverData.email,
      document: driverData.document,
      carPlate: driverData.car_plate
    }
  }
}