export class CarPlate {
  private value: string

  constructor(value: string) {
    if (!this.validate(value)) throw new Error('Invalid car plate')
    this.value = value
  }

  private validate(carPlate: string) {
    return String(carPlate).match(/^[A-Z]{3}\d{4}$/)
  }

  getValue () {
    return this.value
  }
}