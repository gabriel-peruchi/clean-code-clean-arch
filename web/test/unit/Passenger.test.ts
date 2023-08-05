import { Passenger } from "../../src/domain/Passenger"

it('should not create a invalid passenger', () => {
  expect(() => new Passenger('', '', '', '')).toThrow('Invalid name')
})