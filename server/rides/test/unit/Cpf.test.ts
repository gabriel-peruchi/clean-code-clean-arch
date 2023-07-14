import { Cpf } from '../../src/Cpf'

it.each(['83432616074', '74587887803', '87175659520'])('should validate valid cpfs', (value: string) => {
  const cpf = new Cpf(value)
  expect(cpf.value).toBe(value)
})

it.each(['8343261607', '11111111111', ''])('should validate invalid cpfs', (cpf: string) => {
  expect(() => new Cpf(cpf)).toThrow('Invalid cpf')
})