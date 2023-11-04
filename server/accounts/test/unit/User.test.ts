import crypto from 'node:crypto'

import { PasswordTypeEnum, User } from "../../src/domain/user/User"

it('should create an user with plain password', () => {
  const user = User.create('gabriel@hotmail.com', '123456', PasswordTypeEnum.PLAIN)
  expect(user.id).toBeDefined()
  expect(user.password.value).toBe('123456')
  expect(user.email.value).toBe('gabriel@hotmail.com')
})

it('should restore an existing user', () => {
  const userId = crypto.randomUUID()
  const user = User.restore(userId, 'gabriel@hotmail.com', '123456', PasswordTypeEnum.PLAIN)
  expect(user.id).toBe(userId)
  expect(user.password.value).toBe('123456')
  expect(user.email.value).toBe('gabriel@hotmail.com')
})

it('should create an user with encrypted password by SHA1', () => {
  const user = User.create('gabriel@hotmail.com', '123456', PasswordTypeEnum.SHA1)
  expect(user.id).toBeDefined()
  expect(user.password.value).toBe('7c4a8d09ca3762af61e59520943dc26494f8941b')
  expect(user.email.value).toBe('gabriel@hotmail.com')
})

it('should validate an user with plain password', () => {
  const userId = crypto.randomUUID()
  const user = User.restore(userId, 'gabriel@hotmail.com', '123456', PasswordTypeEnum.PLAIN)
  expect(user.validatePassword('123456')).toBe(true)
})

it('should validate an user with encrypted password by SHA1', () => {
  const userId = crypto.randomUUID()
  const user = User.restore(userId, 'gabriel@hotmail.com', '7c4a8d09ca3762af61e59520943dc26494f8941b', PasswordTypeEnum.SHA1)
  expect(user.validatePassword('123456')).toBe(true)
})

it('should create an user with encrypted password by PBKDF2', () => {
  const user = User.create('gabriel@hotmail.com', '123456', PasswordTypeEnum.PBKDF2)
  expect(user.id).toBeDefined()
  expect(user.email.value).toBe('gabriel@hotmail.com')
})

it('should validate an user with encrypted password by PBKDF2', () => {
  const userId = crypto.randomUUID()
  const salt = '7916d8961d18579c8021c4d364c14f7c93293d01'
  const password = 'c7dada06af88cd01008ba9143225952b4705d9c6f3bc653fdc3fdbabbed413cc29cd5d806fdd723554f4f8902fa51e50ee3c204c44cc3054981b683286272970'
  const user = User.restore(userId, 'gabriel@hotmail.com', password, PasswordTypeEnum.PBKDF2, salt)
  expect(user.validatePassword('123456')).toBe(true)
})