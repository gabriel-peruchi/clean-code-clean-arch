import { Name } from "../../src/domain/Name"

it('should create a valid name', () => {
  const name = new Name('Gabriel Peruchi')
  expect(name.getValue()).toBe('Gabriel Peruchi')
})

it('should not create a invalid name', () => {
  expect(() => new Name('Gabriel')).toThrow(new Error('Invalid name'))
})