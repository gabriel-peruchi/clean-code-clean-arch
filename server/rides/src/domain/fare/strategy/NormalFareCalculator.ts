import { FareCalculator } from "./FareCalculator"
import { Segment } from "../../ride/Segment"

export class NormalFareCalculator implements FareCalculator {
  FARE = 2.1

  calculate(segment: Segment) {
      return segment.distance * this.FARE
  }
}