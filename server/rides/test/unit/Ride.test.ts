
import { Coordinate } from '../../src/domain/distance/Coordinate'
import { Ride } from '../../src/domain/ride/Ride'

it('should calculate price of a ride during the day', () => {
  const ride = Ride.create('fakeId', new Coordinate(0, 0), new Coordinate(0, 0))
  ride.addPosition(-27.584905257808835, -48.545022195325124, new Date('2021-03-01T10:00:00'))
  ride.addPosition(-27.496887588317275, -48.522234807851476, new Date('2021-03-01T10:00:00'))
  expect(ride.calculate()).toBe(21)
})

it('should calculate price of a ride during the night', () => {
  const ride = Ride.create('fakeId', new Coordinate(0, 0), new Coordinate(0, 0))
  ride.addPosition(-27.584905257808835, -48.545022195325124, new Date('2021-03-01T23:00:00'))
  ride.addPosition(-27.496887588317275, -48.522234807851476, new Date('2021-03-01T23:00:00'))
  expect(ride.calculate()).toBe(39)
})

it('should calculate price of a ride on sunday during the day', () => {
  const ride = Ride.create('fakeId', new Coordinate(0, 0), new Coordinate(0, 0))
  ride.addPosition(-27.584905257808835, -48.545022195325124, new Date('2021-03-07T10:00:00'))
  ride.addPosition(-27.496887588317275, -48.522234807851476, new Date('2021-03-07T10:00:00'))
  expect(ride.calculate()).toBe(29)
})

it('should calculate price of a ride on sunday during the night', () => {
  const ride = Ride.create('fakeId', new Coordinate(0, 0), new Coordinate(0, 0))
  ride.addPosition(-27.584905257808835, -48.545022195325124, new Date('2021-03-07T23:00:00'))
  ride.addPosition(-27.496887588317275, -48.522234807851476, new Date('2021-03-07T23:00:00'))
  expect(ride.calculate()).toBe(50)
})

it('should return an error if the data is invalid', () => {
  const ride = Ride.create('fakeId', new Coordinate(0, 0), new Coordinate(0, 0))
  ride.addPosition(-27.584905257808835, -48.545022195325124, new Date('javacript'))
  ride.addPosition(-27.496887588317275, -48.522234807851476, new Date('javacript'))
  expect(() => ride.calculate()).toThrow(new Error('Invalid date'))
})

it('should calculate price of a ride during the day with minimum price', () => {
  const ride = Ride.create('fakeId', new Coordinate(0, 0), new Coordinate(0, 0))
  ride.addPosition(-27.584905257808835, -48.545022195325124, new Date('2021-03-01T10:00:00'))
  ride.addPosition(-27.579020277800876, -48.50838017206791, new Date('2021-03-01T10:00:00'))
  expect(ride.calculate()).toBe(10)
})

it('should request a ride', () => {
  const ride = Ride.create('fakeId', new Coordinate(0, 0), new Coordinate(0, 0))
  expect(ride.status.value).toBe('requested')
})

it('should accept a ride', () => {
  const ride = Ride.create('fakeId', new Coordinate(0, 0), new Coordinate(0, 0))
  ride.accept('fakeId', new Date('2021-03-01T10:10:00'))
  expect(ride.status.value).toBe('accepted')
})

it('should start a ride', () => {
  const ride = Ride.create('fakeId', new Coordinate(0, 0), new Coordinate(0, 0))
  ride.accept('fakeId', new Date('2021-03-01T10:10:00'))
  ride.start(new Date('2021-03-01T10:20:00'))
  expect(ride.status.value).toBe('in_progress')
})

it('should end a ride', () => {
  const ride = Ride.create('fakeId', new Coordinate(0, 0), new Coordinate(0, 0))
  ride.accept('fakeId', new Date('2021-03-01T10:10:00'))
  ride.start(new Date('2021-03-01T10:20:00'))
  ride.end(new Date('2021-03-01T10:40:00'))
  expect(ride.status.value).toBe('completed')
})

it('should not start a ride if the ride is not accepted', () => {
  const ride = Ride.create('fakeId', new Coordinate(0, 0), new Coordinate(0, 0))
  expect(() => ride.start(new Date('2021-03-01T10:40:00'))).toThrow('Invalid status')
})

it('should not end a ride if the ride is not in progress', () => {
  const ride = Ride.create('fakeId', new Coordinate(0, 0), new Coordinate(0, 0))
  expect(() => ride.end(new Date('2021-03-01T10:40:00'))).toThrow('Invalid status')
})