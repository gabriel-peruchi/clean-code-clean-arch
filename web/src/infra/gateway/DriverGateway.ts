import { Driver } from "../../domain/Driver"

export interface DriverGateway {
  create(driver: Driver): Promise<string>
}

export type CreateDriverInput = {
  id: string
  name: string
  email: string
  document: string
  carPlate: string
}