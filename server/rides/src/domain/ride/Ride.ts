import crypto from 'node:crypto'

import { Segment } from './Segment'
import { Position } from './Position'
import { NormalFareCalculatorHandler } from './../fare/chain-of-responsibility/NormalFareCalculatorHandler'
import { DistanceCalculator } from '../distance/DistanceCalculator'
import { FareCalculatorHandler } from '../fare/chain-of-responsibility/FareCalculatorHandler'
import { OvernightFareCalculatorHandler } from '../fare/chain-of-responsibility/OvernightFareCalculatorHandler'
import { SundayFareCalculatorHandler } from '../fare/chain-of-responsibility/SundayFareCalculatorHandler'
import { OvernightSundayFareCalculatorHandler } from '../fare/chain-of-responsibility/OvernightSundayFareCalculatorHandler'
import { Coordinate } from '../distance/Coordinate'
import { RideStatus } from './status/RideStatus'
import { RideStatusFactory } from './status/RideStatusFactory'

export class Ride {
  MIN_PRICE = 10
  positions: Position[]
  fareCalculator: FareCalculatorHandler
  driverId?: string
  acceptDate?: Date
  startDate?: Date
  endDate?: Date
  status: RideStatus

  constructor(readonly id: string, readonly passengerId: string, readonly from: Coordinate, readonly to: Coordinate, status: string, readonly requestDate: Date) {
    this.positions = []
    const overnightSundayFareCalculator = new OvernightSundayFareCalculatorHandler()
    const sundayFareCalculator = new SundayFareCalculatorHandler(overnightSundayFareCalculator)
    const overnightFareCalculator = new OvernightFareCalculatorHandler(sundayFareCalculator)
    this.fareCalculator = new NormalFareCalculatorHandler(overnightFareCalculator)
    this.status = RideStatusFactory.create(this, status)
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
      price += this.fareCalculator.handle(segment)
    }
    return (price < this.MIN_PRICE) ? this.MIN_PRICE : price
  }

  accept(driverId: string, date: Date) {
    this.driverId = driverId
    this.status.accept()
    this.acceptDate = date
  }

  start(date: Date) {
    this.status.start()
    this.startDate = date
  }

  end(date: Date) {
    this.status.end()
    this.endDate = date
  }

  static create(passengerId: string, from: Coordinate, to: Coordinate, requestDate: Date = new Date()) {
    const rideId = crypto.randomUUID()
    const status = 'requested'
    return new Ride(rideId, passengerId, from, to, status, requestDate)
  }
}