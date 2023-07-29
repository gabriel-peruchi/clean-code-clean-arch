import { Ride } from "../../domain/ride/Ride"

export interface RideRepository {
  create(ride: Ride): Promise<void>
  findById(rideId: string): Promise<Ride>
}