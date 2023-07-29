import { Passenger } from "../../src/domain/passenger/Passenger"

it('should create a passenger', () => {
  const passenger = Passenger.create('Gabriel', 'gabriel@hotmail.com', '83432616074')
  expect(passenger.id).toBeDefined()
  expect(passenger.name).toEqual('Gabriel')
  expect(passenger.email.value).toEqual('gabriel@hotmail.com')
  expect(passenger.document.value).toEqual('83432616074')
})

it('should no create a passenger with invalid email', () => {
  expect(() => Passenger.create('Gabriel', 'gabriel@hotmail', '83432616074')).toThrow(new Error('Invalid email'))
})

it('should no create a passenger with invalid cpf', () => {
  expect(() => Passenger.create('Gabriel', 'gabriel@hotmail.com', '83432616075')).toThrow(new Error('Invalid cpf'))
})