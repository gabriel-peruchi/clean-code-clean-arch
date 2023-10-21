import { CarPlate } from './CarPlate'
import { Cpf } from '../person/Cpf'
import { Email } from '../person/Email'
import crypto from 'node:crypto'

export class Driver {
  email: Email
  document: Cpf
  carPlate: CarPlate

  constructor(readonly id: string, readonly name: string, email: string, document: string, carPlate: string) {
    this.email = new Email(email)
    this.document = new Cpf(document)
    this.carPlate = new CarPlate(carPlate)
  }

  static create(name: string, email: string, document: string, carPlate: string) {
    const id = crypto.randomUUID()
    return new Driver(id, name, email, document, carPlate)
  }
}