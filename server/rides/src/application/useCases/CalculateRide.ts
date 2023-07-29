import { Ride } from '../../domain/ride/Ride'

type CalculateRideInput = {
  positions: {
    lat: number,
    long: number,
    date: Date
  }[]
}

type CalculateRideOutput = {
  price: number
}

export class CalculateRide {
  constructor() {}

  async execute({ positions }: CalculateRideInput): Promise<CalculateRideOutput> {
    const ride = new Ride()
    for (const position of positions) {
      ride.addPosition(position.lat, position.long, new Date(position.date))
    }
    const price = ride.calculate()
    return { price }
  }
}
