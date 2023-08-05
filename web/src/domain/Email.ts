export class Email {
  private value: string

  constructor(value: string) {
    if (!this.validate(value)) throw new Error('Invalid email')
    this.value = value
  }

  private validate(email: string) {
    return String(email).toLowerCase().match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
  }

  getValue() {
    return this.value
  }
}