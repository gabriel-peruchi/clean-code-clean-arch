import { Segment } from '../../ride/Segment'

export interface FareCalculator {
  calculate(segment: Segment): number
}