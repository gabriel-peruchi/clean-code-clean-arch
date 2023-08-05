import { Coordinate } from "./Coordinate"

export class Ride {
  id: string
  passengerId: string
  from: Coordinate
  to: Coordinate

  constructor(id: string, passengerId: string, fromLat: number, fromLong: number, toLat: number, toLong: number) {
    this.id = id
    this.passengerId = passengerId
    this.from = new Coordinate(fromLat, fromLong)
    this.to = new Coordinate(toLat, toLong)
  }

  static create(builder: RideBuilder) {
    return new Ride('', builder.passengerId, builder.fromLat, builder.fromLong, builder.toLat, builder.toLong)
  }
}

export class RideBuilder {
  passengerId = ''
  fromLat = 0
  fromLong = 0
  toLat = 0
  toLong = 0

  build() {
    return Ride.create(this)
  }
}