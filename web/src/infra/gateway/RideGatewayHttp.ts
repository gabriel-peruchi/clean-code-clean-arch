import { CalculateRideInput, RequestRideInput, RideGateway } from "./RideGateway"
import { HttpClient } from "../http/HttpClient"
import { Ride } from "../../domain/Ride"

export class RideGatewayHttp implements RideGateway {
  constructor(readonly httpClient: HttpClient) { }

  async calculate(ride: Ride): Promise<number> {
    const input: CalculateRideInput = {
      positions: [
        { lat: ride.from.lat, long: ride.from.long, date: new Date() },
        { lat: ride.to.lat, long: ride.to.long, date: new Date() }
      ]
    }
    const data = await this.httpClient.post('http://localhost:3333/rides/calculate-ride', input)
    return data.price
  }

  async request(ride: Ride): Promise<string> {
    const input: RequestRideInput = {
      date: new Date(),
      passengerId: ride.passengerId,
      from: {
        lat: ride.from.lat,
        long: ride.from.long,
      },
      to: {
        lat: ride.to.lat,
        long: ride.to.long,
      }
    }
    const data = await this.httpClient.post('http://localhost:3333/rides/request-ride', input)
    return data.rideId
  }
}