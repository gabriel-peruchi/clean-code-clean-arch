import { Coordinate } from '../distance/Coordinate'

export class Position {
  coordinate: Coordinate

  constructor(lat: number, long: number, readonly date: Date) {
    this.coordinate = new Coordinate(lat, long)
  }
}