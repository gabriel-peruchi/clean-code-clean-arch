import { sign, verify } from 'jsonwebtoken'

export class TokenGenerator {
  static create(key: string, email: string, date: Date) {
    const expiresIn = 1000000
    return sign({
      email,
      expiresIn,
      iat: date.getTime()
    }, key)
  }

  static verify(key: string, token: string): any {
    return verify(token, key)
  }
}