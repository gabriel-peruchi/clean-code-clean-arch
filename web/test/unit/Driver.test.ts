import { Driver } from "../../src/domain/Driver"

it('should not create a invalid driver name', () => {
  expect(() => new Driver('', '', '', '', '')).toThrow('Invalid name')
})

it('should not create a invalid driver email', () => {
  expect(() => new Driver('', 'Gabriel Peruchi', '', '', '')).toThrow('Invalid email')
})

it('should not create a invalid driver document', () => {
  expect(() => new Driver('', 'Gabriel Peruchi', 'gabriel@hotmail.com', '', '')).toThrow('Invalid cpf')
})

it('should not create a invalid driver car plate', () => {
  expect(() => new Driver('', 'Gabriel Peruchi', 'gabriel@hotmail.com', '83432616074', '')).toThrow('Invalid car plate')
})