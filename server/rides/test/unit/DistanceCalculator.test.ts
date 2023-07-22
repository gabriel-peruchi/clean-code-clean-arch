import { Coordinate } from "../../src/domain/Coordinate"
import { DistanceCalculator } from "../../src/domain/DistanceCalculator"

it('should calculate the distance between two coordinates', () => {
  const from = new Coordinate(-27.584905257808835, -48.545022195325124)
  const to = new Coordinate(-27.496887588317275, -48.522234807851476)
  const distance = DistanceCalculator.calculate(from, to)
  expect(distance).toBe(10)
})