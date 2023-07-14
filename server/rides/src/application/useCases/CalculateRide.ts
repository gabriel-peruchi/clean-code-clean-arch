import { Ride } from '../../Ride'

type CalculateRideInput = {
  segments: {
    from: [number, number],
    to: [number, number],
    date: Date
  }[]
}

type CalculateRideOutput = {
  price: number
}

export class CalculateRide {
  constructor() {}

  async execute({ segments }: CalculateRideInput): Promise<CalculateRideOutput> {
    const ride = new Ride()
    for (const segment of segments) {
      ride.addSegment(segment.from, segment.to, new Date(segment.date))
    }
    const price = ride.calculate()
    return { price }
  }
}
