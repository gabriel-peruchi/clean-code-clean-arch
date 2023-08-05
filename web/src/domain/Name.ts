export class Name {
  private value: string

  constructor(name: string) {
    if (!this.validate(name)) throw new Error('Invalid name')
    this.value = name
  }

  getValue() {
    return this.value
  }

  private validate(name: string) {
    return String(name).match(/^[A-Za-z]+(?:\s+[A-Za-z]+)+$/)
  }
}