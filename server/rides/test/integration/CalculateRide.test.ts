import { CalculateRide } from '../../src/application/useCases/CalculateRide'

it('should calculate price of a ride during the day', async () => {
  const input = {
    segments: [{
      from: [-29.225855, -49.812479] as [number, number],
      to: [-29.161890, -49.739435] as [number, number],
      date: new Date('2023-06-29T10:00:00')
    }]
  }
  const calculateRide = new CalculateRide()
  const { price } = await calculateRide.execute(input)
  expect(price).toBe(21)
})
