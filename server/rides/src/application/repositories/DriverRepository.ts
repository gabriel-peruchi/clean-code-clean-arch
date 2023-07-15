export interface DriverRepository {
  create(driver: any): Promise<void>
  findById(driverId: any): Promise<any>
}