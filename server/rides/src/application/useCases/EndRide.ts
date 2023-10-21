import { AccountGateway } from "../gateways/AccountGateway"
import { PaymentGateway } from "../gateways/PaymentGateway"
import { RideRepository } from "../repositories/RideRepository"

type EndRideInput = {
  date: Date,
  rideId: string,
}

export class EndRide {
  constructor(
    readonly rideRepository: RideRepository,
    readonly paymentGateway: PaymentGateway,
    readonly accountGateway: AccountGateway,
  ) { }

  async execute(input: EndRideInput): Promise<void> {
    const ride = await this.rideRepository.findById(input.rideId)
    ride.end(input.date)
    await this.rideRepository.update(ride)
    const passenger = await this.accountGateway.getPassenger(ride.passengerId)
    await this.paymentGateway.createTransaction({
      name: passenger.name,
      amount: ride.calculate(),
      email: passenger.email,
    })
  }
}