import axios from 'axios'

axios.defaults.validateStatus = () => true

it('should process a payment transaction', async () => {
  const input = {
    name: 'Gabriel',
    email: 'gabriel@hotmail.com',
    amount: 30
  }
  const responseCreate = await axios.post('http://localhost:3334/transactions', input)
  const outputCreate = responseCreate.data
  const responseGet = await axios.get(`http://localhost:3334/transactions/${outputCreate.transactionId}`)
  const outputGet = responseGet.data
  expect(outputGet.id).toBe(outputCreate.transactionId)
  expect(outputGet.name).toBe('Gabriel')
  expect(outputGet.email).toBe('gabriel@hotmail.com')
  expect(outputGet.amount).toBe(30)
})