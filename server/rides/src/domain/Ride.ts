import { Coordinates, Segment } from './Segment'

export class Ride {
  segments: Segment[]
  OVERNIGHT_FARE = 3.90
  OVERNIGHT_SUNDAY_FARE = 5
  SUNDAY_FARE = 2.9
  NORMAL_FARE = 2.1
  MIN_PRICE = 10

  constructor() {
    this.segments = []
  }

  addSegment(from: Coordinates, to: Coordinates, date: Date) {
    this.segments.push(new Segment(from, to, date))
  }

  calculate() {
    let price = 0
    for (const segment of this.segments) {
      const distance = segment.calculateDistance()
      if (segment.isOvernight() && !segment.isSunday()) {
        price += distance * this.OVERNIGHT_FARE
      }
      if (segment.isOvernight() && segment.isSunday()) {
        price += distance * this.OVERNIGHT_SUNDAY_FARE
      }
      if (!segment.isOvernight() && segment.isSunday()) {
        price += distance * this.SUNDAY_FARE
      }
      if (!segment.isOvernight() && !segment.isSunday()) {
        price += distance * this.NORMAL_FARE
      }
    }
    return (price < this.MIN_PRICE) ? this.MIN_PRICE : price
  }
}