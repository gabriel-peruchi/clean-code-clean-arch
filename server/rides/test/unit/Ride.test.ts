
import { Ride } from '../../src/domain/ride/Ride'

it('should calculate price of a ride during the day', () => {
  const ride = new Ride()
  ride.addPosition(-27.584905257808835, -48.545022195325124, new Date('2021-03-01T10:00:00'))
  ride.addPosition(-27.496887588317275, -48.522234807851476, new Date('2021-03-01T10:00:00'))
  expect(ride.calculate()).toBe(21)
})

it('should calculate price of a ride during the night', () => {
  const ride = new Ride()
  ride.addPosition(-27.584905257808835, -48.545022195325124, new Date('2021-03-01T23:00:00'))
  ride.addPosition(-27.496887588317275, -48.522234807851476, new Date('2021-03-01T23:00:00'))
  expect(ride.calculate()).toBe(39)
})

it('should calculate price of a ride on sunday during the day', () => {
  const ride = new Ride()
  ride.addPosition(-27.584905257808835, -48.545022195325124, new Date('2021-03-07T10:00:00'))
  ride.addPosition(-27.496887588317275, -48.522234807851476, new Date('2021-03-07T10:00:00'))
  expect(ride.calculate()).toBe(29)
})

it('should calculate price of a ride on sunday during the night', () => {
  const ride = new Ride()
  ride.addPosition(-27.584905257808835, -48.545022195325124, new Date('2021-03-07T23:00:00'))
  ride.addPosition(-27.496887588317275, -48.522234807851476, new Date('2021-03-07T23:00:00'))
  expect(ride.calculate()).toBe(50)
})

it('should return an error if the data is invalid', () => {
  const ride = new Ride()
  ride.addPosition(-27.584905257808835, -48.545022195325124, new Date('javacript'))
  ride.addPosition(-27.496887588317275, -48.522234807851476, new Date('javacript'))
  expect(() => ride.calculate()).toThrow(new Error('Invalid date'))
})

it('should calculate price of a ride during the day with minimum price', () => {
  const ride = new Ride()
  ride.addPosition(-27.584905257808835, -48.545022195325124, new Date('2021-03-01T10:00:00'))
  ride.addPosition(-27.579020277800876, -48.50838017206791, new Date('2021-03-01T10:00:00'))
  expect(ride.calculate()).toBe(10)
})
