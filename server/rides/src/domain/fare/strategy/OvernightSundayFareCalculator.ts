import { FareCalculator } from "./FareCalculator"
import { Segment } from "../../ride/Segment";

export class OvernightSundayFareCalculator implements FareCalculator {
  FARE = 5

  calculate(segment: Segment) {
      return segment.distance * this.FARE
  }
}