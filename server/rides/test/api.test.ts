import axios from 'axios'

axios.defaults.validateStatus = () => true

it('should calculate price of a ride during the day', async () => {
  const input = {
    segments: [
      { distance: 10, date: '2023-06-29T10:00:00' }
    ]
  }
  const response = await axios.post('http://localhost:3333/calculate-ride', input)
  const output = response.data
  expect(output.price).toBe(21)
})

it('should return an error for an invalid distance', async () => {
  const input = {
    segments: [
      { distance: -10, date: '2023-06-29T10:00:00' }
    ]
  }
  const response = await axios.post('http://localhost:3333/calculate-ride', input)
  const output = response.data
  expect(response.status).toBe(404)
  expect(output).toBe('Invalid distance')
})