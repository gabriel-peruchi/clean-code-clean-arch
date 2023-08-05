import { CarPlate } from "./CarPlate"
import { Cpf } from "./Cpf"
import { Email } from "./Email"
import { Name } from "./Name"

export class Driver {
  id: string
  name: Name
  email: Email
  document: Cpf
  carPlate: CarPlate

  constructor(id: string, name: string, email: string, document: string, carPlate: string) {
    this.id = id
    this.name = new Name(name)
    this.email = new Email(email)
    this.document = new Cpf(document)
    this.carPlate = new CarPlate(carPlate)
  }

  static create(builder: DriverBuilder) {
    return new Driver(builder.id, builder.name, builder.email, builder.document, builder.carPlate)
  }
}

export class DriverBuilder {
  id: string = ''
  name: string = ''
  email: string = ''
  document: string = ''
  carPlate: string  = ''

  build() {
    return Driver.create(this)
  }
}