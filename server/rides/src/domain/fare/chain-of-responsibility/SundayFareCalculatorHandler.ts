import { Segment } from "../../ride/Segment";
import { FareCalculatorHandler } from "./FareCalculatorHandler";

export class SundayFareCalculatorHandler extends FareCalculatorHandler {
  FARE = 2.9
  
  handle(segment: Segment): number {
    if (!segment.isOvernight() && segment.isSunday()) {
      return segment.distance * this.FARE
    }
    if(!this.next) throw new Error('Invalid segment')
    return this.next.handle(segment)
  }
}