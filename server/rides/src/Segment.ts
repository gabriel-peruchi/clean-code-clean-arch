import { calculate } from "./DistanceCalculator"

export type Coordinates = [number, number]

export class Segment {
  constructor(readonly from: Coordinates, readonly to: Coordinates, readonly date: Date) {
    if (!this.isValidDate()) throw new Error('Invalid date')
  }

  isOvernight() {
    return this.date.getHours() >= 22 || this.date.getHours() <= 6
  }

  isSunday() {
    return this.date.getDay() === 0
  }

  isValidDate() {
    return this.date && this.date instanceof Date && this.date.toString() !== 'Invalid Date'
  }

  calculateDistance() {
    return Math.trunc(calculate(this.from[0], this.from[1], this.to[0], this.to[1]))
  }
}