import { RideRepository } from "../repositories/RideRepository"

type AcceptRideInput = {
  date: Date,
  rideId: string,
  driverId: string,
}

export class AcceptRide {
  constructor(readonly rideRepository: RideRepository) { }

  async execute(input: AcceptRideInput): Promise<void> {
    const ride = await this.rideRepository.findById(input.rideId)
    ride.accept(input.driverId, input.date)
    await this.rideRepository.update(ride)
  }
}