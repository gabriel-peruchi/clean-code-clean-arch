
import { Ride } from '../../src/Ride'

it('should calculate price of a ride during the day', () => {
  const ride = new Ride()
  ride.addSegment([-29.225855, -49.812479], [-29.161890, -49.739435], new Date('2021-03-01T10:00:00'))
  expect(ride.calculate()).toBe(21)
})

it('should calculate price of a ride during the night', () => {
  const ride = new Ride()
  ride.addSegment([-29.225855, -49.812479], [-29.161890, -49.739435], new Date('2021-03-01T23:00:00'))
  expect(ride.calculate()).toBe(39)
})

it('should calculate price of a ride on sunday during the day', () => {
  const ride = new Ride()
  ride.addSegment([-29.225855, -49.812479], [-29.161890, -49.739435], new Date('2021-03-07T10:00:00'))
  expect(ride.calculate()).toBe(29)
})

it('should calculate price of a ride on sunday during the night', () => {
  const ride = new Ride()
  ride.addSegment([-29.225855, -49.812479], [-29.161890, -49.739435], new Date('2021-03-07T23:00:00'))
  expect(ride.calculate()).toBe(50)
})

it('should return an error if the data is invalid', () => {
  const ride = new Ride()
  expect(() => ride.addSegment([-29.225855, -49.812479], [-29.161890, -49.739435], new Date('javascript'))).toThrow(new Error('Invalid date'))
})

it('should calculate price of a ride during the day with minimum price', () => {
  const ride = new Ride()
  ride.addSegment([3, 3], [3, 3], new Date('2021-03-01T10:00:00'))
  expect(ride.calculate()).toBe(10)
})

it('should calculate price of a ride with multiple segments', () => {
  const ride = new Ride()
  ride.addSegment([-29.225855, -49.812479], [-29.161890, -49.739435], new Date('2021-03-01T10:00:00'))
  ride.addSegment([-29.225855, -49.812479], [-29.161890, -49.739435], new Date('2021-03-01T12:00:00'))
  expect(ride.calculate()).toBe(42)
})