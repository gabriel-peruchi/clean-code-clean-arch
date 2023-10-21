import axios from 'axios'

axios.defaults.validateStatus = () => true

it('should calculate price of a ride during the day', async () => {
  const input = {
    positions: [
      { lat: -27.584905257808835, long: -48.545022195325124, date: new Date('2021-03-01T10:00:00') },
      { lat: -27.496887588317275, long: -48.522234807851476, date: new Date('2021-03-01T10:00:00') },
    ]
  }
  const response = await axios.post('http://localhost:3333/rides/calculate-ride', input)
  const output = response.data
  expect(output.price).toBe(21)
})

it('should return an error for an invalid date', async () => {
  const input = {
    positions: [
      { lat: -27.584905257808835, long: -48.545022195325124, date: 'javacript' },
      { lat: -27.496887588317275, long: -48.522234807851476, date: 'javacript' },
    ]
  }
  const response = await axios.post('http://localhost:3333/rides/calculate-ride', input)
  expect(response.status).toBe(422)
  expect(response.data).toBe('Invalid date')
})
