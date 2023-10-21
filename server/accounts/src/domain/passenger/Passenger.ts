import { Cpf } from '../person/Cpf'
import { Email } from '../person/Email'
import crypto from 'node:crypto'

export class Passenger {
  email: Email
  document: Cpf

  constructor(readonly id: string, readonly name: string, email: string, document: string) {
    this.email = new Email(email)
    this.document = new Cpf(document)
  }

  static create(name: string, email: string, document: string) {
    const id = crypto.randomUUID()
    return new Passenger(id, name, email, document)
  }
}