import { Coordinate } from "../../domain/distance/Coordinate"
import { Ride } from "../../domain/ride/Ride"
import { RideRepository } from "../repositories/RideRepository"

type RequestRideInput = {
  passengerId: string,
  from: {
    lat: number,
    long: number,
  },
  to: {
    lat: number,
    long: number,
  },
  date: Date
}

type RequestRideOutput = {
  rideId: string
}

export class RequestRide {
  constructor(readonly rideRepository: RideRepository) { }

  async execute(input: RequestRideInput): Promise<RequestRideOutput> {
    const ride = Ride.create(
      input.passengerId,
      new Coordinate(input.from.lat, input.from.long),
      new Coordinate(input.to.lat, input.to.lat),
      input.date
    )
    await this.rideRepository.create(ride)
    return { rideId: ride.id }
  }
}