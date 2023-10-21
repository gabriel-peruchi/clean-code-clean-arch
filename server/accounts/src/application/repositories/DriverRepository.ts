import { Driver } from "../../domain/driver/Driver"

export interface DriverRepository {
  create(driver: Driver): Promise<void>
  findById(driverId: string): Promise<Driver>
}