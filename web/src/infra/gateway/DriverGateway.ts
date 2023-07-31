import { Driver } from "../../domain/Driver"

export interface DriverGateway {
  create(driver: Driver): Promise<string>
}