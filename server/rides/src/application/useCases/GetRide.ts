import { RideRepository } from "../repositories/RideRepository"

type GetRideInput = {
  rideId: string
}

type GetRideOutput = {
  id: string
  status: string
  requestDate: Date
}

export class GetRide {
  constructor(readonly rideRepository: RideRepository) { }

  async execute({ rideId }: GetRideInput): Promise<GetRideOutput> {
    const ride = await this.rideRepository.findById(rideId)
    return {
      id: ride.id,
      status: ride.status,
      requestDate: ride.requestDate
    }
  }
}