import crypto from 'node:crypto'

import { Email } from "../person/Email"
import { Password } from './Password'
import { PasswordFactory } from './PasswordFactory'

export enum PasswordTypeEnum {
  SHA1 = 'SHA1',
  PLAIN = 'PLAIN',
  PBKDF2 = 'PBKDF2'
}

export class User {
  private constructor(readonly id: string, readonly email: Email, readonly password: Password, readonly passwordType: PasswordTypeEnum) { }

  static create(email: string, password: string, passwordType: PasswordTypeEnum) {
    const id = crypto.randomUUID()
    return new User(id, new Email(email), PasswordFactory.create(passwordType).create(password), passwordType)
  }

  static restore(id: string, email: string, password: string, passwordType: PasswordTypeEnum, salt?: string) {
    return new User(id, new Email(email), PasswordFactory.create(passwordType).restore(password, salt!), passwordType)
  }

  validatePassword(password: string) {
    return this.password.validate(password)
  }
}