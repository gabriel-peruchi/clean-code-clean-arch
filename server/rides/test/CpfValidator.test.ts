import { validate } from '../src/CpfValidator'

it.each(['83432616074', '74587887803', '87175659520'])('should validate valid cpfs', (cpf: string) => {
  const isValid = validate(cpf)
  expect(isValid).toBeTruthy()
})

it.each(['8343261607', '11111111111', ''])('should validate invalid cpfs', (cpf: string) => {
  const isValid = validate(cpf)
  expect(isValid).toBeFalsy()
})