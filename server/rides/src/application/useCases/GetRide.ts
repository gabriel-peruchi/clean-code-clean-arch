import { AccountGateway } from "../gateways/AccountGateway"
import { RideRepository } from "../repositories/RideRepository"

type GetRideInput = {
  rideId: string
}

type GetRideOutput = {
  id: string
  status: string
  requestDate: Date
  driverId?: string
  passengerId: string
  acceptDate?: Date
  startDate?: Date
  endDate?: Date
  passengerName: string
  driverName?: string
}

export class GetRide {
  constructor(
    readonly rideRepository: RideRepository,
    readonly accountGateway: AccountGateway,
  ) { }

  async execute({ rideId }: GetRideInput): Promise<GetRideOutput> {
    const ride = await this.rideRepository.findById(rideId)
    const passenger = await this.accountGateway.getPassenger(ride.passengerId)
    let driver = null
    if (ride.driverId) {
      driver = await this.accountGateway.getDriver(ride.driverId as string)
    }
    return {
      id: ride.id,
      driverId: ride.driverId,
      passengerId: ride.passengerId,
      startDate: ride.startDate,
      status: ride.status.value,
      acceptDate: ride.acceptDate,
      requestDate: ride.requestDate,
      endDate: ride.endDate,
      passengerName: passenger.name,
      driverName: driver?.name
    }
  }
}