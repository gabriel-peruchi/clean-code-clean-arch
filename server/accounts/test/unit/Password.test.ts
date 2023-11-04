import { PBKDF2Password } from "../../src/domain/user/PBKDF2Password"
import { PlainPassword } from "../../src/domain/user/PlainPassword"
import { SHA1Password } from "../../src/domain/user/SHA1Password"

it('should create a plain password', () => {
  const password = PlainPassword.create('123456')
  expect(password.validate('123456')).toBe(true)
})

it('should create a encrypted password by SHA1', () => {
  const password = SHA1Password.create('123456')
  expect(password.validate('123456')).toBe(true)
})

it('should create a encrypted password by PBKDF2', () => {
  const password = PBKDF2Password.create('123456')
  expect(password.validate('123456')).toBe(true)
})