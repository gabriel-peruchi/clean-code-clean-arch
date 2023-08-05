import { Cpf } from "./Cpf"
import { Email } from "./Email"
import { Name } from "./Name"

export class Passenger {
  id: string
  name: Name
  email: Email
  document: Cpf

  constructor(id: string, name: string, email: string, document: string) {
    this.id = id
    this.name = new Name(name)
    this.email = new Email(email)
    this.document = new Cpf(document)
  }

  static create(builder: PassengerBuilder) {
    return new Passenger(builder.id, builder.name, builder.email, builder.document)
  }
}

export class PassengerBuilder {
  id: string = ''
  name: string = ''
  email: string = ''
  document: string = ''

  build() {
    return Passenger.create(this)
  }
}