export interface AccountGateway {
  getDriver(driverId: string): Promise<Driver>
  getPassenger(passengerId: string): Promise<Passenger>
  createPassenger(input: any): Promise<any>
  createDriver(input: any): Promise<any>
}

export type Driver = {
  id: string
  name: string
  email: string
  document: string
  carPlate: string
}

export type Passenger = {
  id: string
  name: string
  email: string
  document: string
}
