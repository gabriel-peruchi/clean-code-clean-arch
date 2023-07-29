import { Coordinate } from "./Coordinate"

// entity/domain service
export class DistanceCalculator {
  static calculate(from: Coordinate, to: Coordinate) {
    const earthRadius = 6371
    const degressToRadius = Math.PI / 180
    const dLat = (to.lat - from.lat) * degressToRadius
    const dLon = (to.long - to.long) * degressToRadius
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(from.lat) * Math.cos(to.lat) * Math.sin(dLon / 2) ** 2
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const distance = earthRadius * c
    return Math.round(distance)
  }
}
