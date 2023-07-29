import { FareCalculator } from "./FareCalculator"
import { Segment } from "../../ride/Segment";

export class SundayFareCalculator implements FareCalculator {
  FARE = 2.9

  calculate(segment: Segment) {
      return segment.distance * this.FARE
  }
}