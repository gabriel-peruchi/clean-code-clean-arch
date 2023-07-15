export interface PassengerRepository {
  create(passenger: any): Promise<void>
  findById(passengerId: any): Promise<any>
}