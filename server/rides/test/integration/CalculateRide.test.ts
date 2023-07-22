import { CalculateRide } from '../../src/application/useCases/CalculateRide'

it('should calculate price of a ride during the day', async () => {
  const input = {
    positions: [
      { lat: -27.584905257808835, long: -48.545022195325124, date: new Date('2021-03-01T10:00:00') },
      { lat: -27.496887588317275, long: -48.522234807851476, date: new Date('2021-03-01T10:00:00') },
    ]
  }
  const calculateRide = new CalculateRide()
  const { price } = await calculateRide.execute(input)
  expect(price).toBe(21)
})
