import { Password } from "./Password"

export class PlainPassword implements Password {
  private constructor(readonly value: string) { }

  static create(password: string) {
    return new PlainPassword(password)
  }

  static restore(password: string) {
    return new PlainPassword(password)
  }

  validate(password: string) {
    return this.value === password
  }
}