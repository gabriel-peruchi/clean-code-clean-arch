import { Email } from "../../src/domain/person/Email"

it('should validate a valid email', () => {
  const email = new Email('gabriel@inmeta.com.br')
  expect(email).toBeTruthy()
})


it('should not validate a invalid email', () => {
  expect(() => new Email('gabriel@inmeta')).toThrow(new Error('Invalid email'))
})