import { RideRepository } from "../repositories/RideRepository"

type EndRideInput = {
  date: Date,
  rideId: string,
}

export class EndRide {
  constructor(readonly rideRepository: RideRepository) { }

  async execute(input: EndRideInput): Promise<void> {
    const ride = await this.rideRepository.findById(input.rideId)
    ride.end(input.date)
    await this.rideRepository.update(ride)
  }
}