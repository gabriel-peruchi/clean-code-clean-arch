import { Segment } from "../../ride/Segment"

export abstract class FareCalculatorHandler {
  constructor(readonly next?: FareCalculatorHandler) { }

  abstract handle(segment: Segment): number
}