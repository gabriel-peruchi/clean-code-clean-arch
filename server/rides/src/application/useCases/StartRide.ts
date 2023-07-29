import { RideRepository } from "../repositories/RideRepository"

type StartRideInput = {
  date: Date,
  rideId: string,
}

export class StartRide {
  constructor(readonly rideRepository: RideRepository) { }

  async execute(input: StartRideInput): Promise<void> {
    const ride = await this.rideRepository.findById(input.rideId)
    ride.start(input.date)
    await this.rideRepository.update(ride)
  }
}