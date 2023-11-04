import crypto from 'node:crypto'

import { Password } from "./Password"

export class SHA1Password implements Password {
  private constructor(readonly value: string) { }

  static create(password: string) {
    const value = crypto.createHash('sha1').update(password).digest('hex')
    return new SHA1Password(value)
  }

  static restore(password: string) {
    return new SHA1Password(password)
  }

  validate(password: string) {
    const value = crypto.createHash('sha1').update(password).digest('hex')
    return this.value === value
  }
} 