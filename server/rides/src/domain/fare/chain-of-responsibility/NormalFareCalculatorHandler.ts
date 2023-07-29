import { Segment } from "../../ride/Segment";
import { FareCalculatorHandler } from "./FareCalculatorHandler";

export class NormalFareCalculatorHandler extends FareCalculatorHandler {
  FARE = 2.1

  handle(segment: Segment): number {
    if (!segment.isOvernight() && !segment.isSunday()) {
      return segment.distance * this.FARE
    }
    if (!this.next) throw new Error()
    return this.next.handle(segment)
  }
}