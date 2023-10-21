import { PaymentGatewayHtpp } from "../../infra/gateways/PaymentGatewayHttp"
import { AxiosAdapter } from "../../infra/http/AxiosAdapter"
import { PaymentGateway } from "../gateways/PaymentGateway"
import { PassengerRepository } from "../repositories/PassengerRepository"
import { RideRepository } from "../repositories/RideRepository"

type EndRideInput = {
  date: Date,
  rideId: string,
}

export class EndRide {
  constructor(
    readonly rideRepository: RideRepository,
    readonly passengerRepository: PassengerRepository,
    readonly paymentGateway: PaymentGateway,
  ) { }

  async execute(input: EndRideInput): Promise<void> {
    const ride = await this.rideRepository.findById(input.rideId)
    ride.end(input.date)
    await this.rideRepository.update(ride)
    const passenger = await this.passengerRepository.findById(ride.passengerId)
    await this.paymentGateway.createTransaction({
      name: passenger.name,
      amount: ride.calculate(),
      email: passenger.email.value,
    })
  }
}