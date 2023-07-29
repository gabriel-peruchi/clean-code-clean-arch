import { NormalFareCalculatorHandler } from './../fare/chain-of-responsibility/NormalFareCalculatorHandler'
import { DistanceCalculator } from '../distance/DistanceCalculator'
import { Position } from './Position'
import { Segment } from './Segment'
import { FareCalculatorHandler } from '../fare/chain-of-responsibility/FareCalculatorHandler'
import { OvernightFareCalculatorHandler } from '../fare/chain-of-responsibility/OvernightFareCalculatorHandler'
import { SundayFareCalculatorHandler } from '../fare/chain-of-responsibility/SundayFareCalculatorHandler'
import { OvernightSundayFareCalculatorHandler } from '../fare/chain-of-responsibility/OvernightSundayFareCalculatorHandler'

export class Ride {
  MIN_PRICE = 10
  positions: Position[]
  fareCalculator: FareCalculatorHandler

  constructor() {
    this.positions = []
    const overnightSundayFareCalculator = new OvernightSundayFareCalculatorHandler()
    const sundayFareCalculator = new SundayFareCalculatorHandler(overnightSundayFareCalculator)
    const overnightFareCalculator = new OvernightFareCalculatorHandler(sundayFareCalculator)
    this.fareCalculator = new NormalFareCalculatorHandler(overnightFareCalculator)
  }

  addPosition(lat: number, long: number, date: Date) {
    this.positions.push(new Position(lat, long, date))
  }

  calculate() {
    let price = 0
    for (const [index, position] of this.positions.entries()) {
      const nextPosition = this.positions[index + 1]
      if (!nextPosition) break
      const distance = DistanceCalculator.calculate(position.coordinate, nextPosition.coordinate)
      const segment = new Segment(distance, nextPosition.date)
      // const fareCalculator = FareCalculatorFactory.create(segment)
      // price += fareCalculator.calculate(segment)
      price += this.fareCalculator.handle(segment)
    }
    return (price < this.MIN_PRICE) ? this.MIN_PRICE : price
  }
}