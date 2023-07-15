import axios from 'axios'

axios.defaults.validateStatus = () => true

it('should calculate price of a ride during the day', async () => {
  const input = {
    segments: [{
      from: [-29.225855, -49.812479],
      to: [-29.161890, -49.739435], 
      date: new Date('2023-06-29T10:00:00')
    }]
  }
  const response = await axios.post('http://localhost:3333/calculate-ride', input)
  const output = response.data
  expect(output.price).toBe(21)
})

it('should create a passenger and return the id', async () => {
  const input = {
    name: 'Gabriel Peruchi',
    document: '83432616074',
    email: 'gabriel@hotmail.com'
  }
  const response = await axios.post('http://localhost:3333/passengers', input)
  const output = response.data
  expect(output.passengerId).toBeDefined()
})

it('should return an error for an passenger invalid document', async () => {
  const input = {
    name: 'Gabriel Peruchi',
    document: '11111111111',
    email: 'gabriel@hotmail.com'
  }
  const response = await axios.post('http://localhost:3333/passengers', input)
  expect(response.status).toBe(422)
  const output = response.data
  expect(output).toBe('Invalid cpf')
})

it('should return a passenger', async () => {
  const input = {
    name: 'Gabriel Peruchi',
    document: '83432616074',
    email: 'gabriel@hotmail.com'
  }
  const responseCreate = await axios.post('http://localhost:3333/passengers', input)
  const outputCreate = responseCreate.data
  const responseGet = await axios.get(`http://localhost:3333/passengers/${outputCreate.passengerId}`)
  const outputGet = responseGet.data
  expect(outputGet.name).toBe('Gabriel Peruchi')
  expect(outputGet.email).toBe('gabriel@hotmail.com')
  expect(outputGet.document).toBe('83432616074')
})

it('should create a driver and return the id', async () => {
  const input = {
    name: 'Gabriel Peruchi',
    email: 'gabriel@hotmail.com',
    document: '83432616074',
    carPlate: 'AAA9999'
  }
  const response = await axios.post('http://localhost:3333/drivers', input)
  const output = response.data
  expect(output.driverId).toBeDefined()
})

it('should return an error for an driver invalid document', async () => {
  const input = {
    name: 'Gabriel Peruchi',
    email: 'gabriel@hotmail.com',
    document: '83432616076',
    carPlate: 'AAA9999'
  }
  const response = await axios.post('http://localhost:3333/drivers', input)
  expect(response.status).toBe(422)
  const output = response.data
  expect(output).toBe('Invalid cpf')
})

it('should return a driver', async () => {
  const input = {
    name: 'Gabriel Peruchi',
    email: 'gabriel@hotmail.com',
    document: '83432616074',
    carPlate: 'AAA9999'
  }
  const responseCreate = await axios.post('http://localhost:3333/drivers', input)
  const outputCreate = responseCreate.data
  const responseGet = await axios.get(`http://localhost:3333/drivers/${outputCreate.driverId}`)
  const outputGet = responseGet.data
  expect(outputGet.name).toBe('Gabriel Peruchi')
  expect(outputGet.email).toBe('gabriel@hotmail.com')
  expect(outputGet.document).toBe('83432616074')
  expect(outputGet.carPlate).toBe('AAA9999')
})