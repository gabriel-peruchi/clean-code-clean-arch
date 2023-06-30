
import { calculate } from '../src/RideCalculator'

it('should calculate price of a ride during the day', () => {
  const segments = [
    { distance: 10, date: new Date('2021-03-01T10:00:00') }
  ]
  const price = calculate(segments)
  expect(price).toBe(21)
})

it('should calculate price of a ride during the night', () => {
  const segments = [
    { distance: 10, date: new Date('2021-03-01T23:00:00') }
  ]
  const price = calculate(segments)
  expect(price).toBe(39)
})

it('should calculate price of a ride on sunday during the day', () => {
  const segments = [
    { distance: 10, date: new Date('2021-03-07T10:00:00') }
  ]
  const price = calculate(segments)
  expect(price).toBe(29)
})

it('should calculate price of a ride on sunday during the night', () => {
  const segments = [
    { distance: 10, date: new Date('2021-03-07T23:00:00') }
  ]
  const price = calculate(segments)
  expect(price).toBe(50)
})

it('should return -1 if the distance is invalid', () => {
  const segments = [
    { distance: -10, date: new Date('2021-03-01T10:00:00') }
  ]
  const price = calculate(segments)
  expect(price).toBe(-1)
})

it('should return -2 if the data is invalid', () => {
  const segments = [
    { distance: 10, date: new Date('javascript') }
  ]
  const price = calculate(segments)
  expect(price).toBe(-2)
})

it('should calculate price of a ride during the day with minimum price', () => {
  const segments = [
    { distance: 3, date: new Date('2021-03-01T10:00:00') }
  ]
  const price = calculate(segments)
  expect(price).toBe(10)
})

it('should calculate price of a ride with multiple segments', () => {
  const segments = [
    { distance: 10, date: new Date('2021-03-01T10:00:00') },
    { distance: 10, date: new Date('2021-03-01T12:00:00') }
  ]
  const price = calculate(segments)
  expect(price).toBe(42)
})