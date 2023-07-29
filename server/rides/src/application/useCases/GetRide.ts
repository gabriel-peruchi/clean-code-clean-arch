import { RideRepository } from "../repositories/RideRepository"

type GetRideInput = {
  rideId: string
}

type GetRideOutput = {
  id: string
  status: string
  requestDate: Date
  driverId?: string
  acceptDate?: Date
  startDate?: Date
  endDate?: Date
}

export class GetRide {
  constructor(readonly rideRepository: RideRepository) { }

  async execute({ rideId }: GetRideInput): Promise<GetRideOutput> {
    const ride = await this.rideRepository.findById(rideId)
    return {
      id: ride.id,
      driverId: ride.driverId,
      startDate: ride.startDate,
      status: ride.status.value,
      acceptDate: ride.acceptDate,
      requestDate: ride.requestDate,
      endDate: ride.endDate,
    }
  }
}