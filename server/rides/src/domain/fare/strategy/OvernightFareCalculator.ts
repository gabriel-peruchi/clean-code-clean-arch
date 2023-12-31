import { FareCalculator } from "./FareCalculator"
import { Segment } from "../../ride/Segment";

export class OvernightFareCalculator implements FareCalculator {
  FARE = 3.90

  calculate(segment: Segment) {
      return segment.distance * this.FARE
  }
}