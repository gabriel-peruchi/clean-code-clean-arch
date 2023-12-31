export class Cpf {
  private value: string

  constructor(value: string) {
    if (!this.validate(value)) throw new Error('Invalid cpf')
    this.value = value
  }

  private validate(cpf: string) {
    cpf = this.clean(cpf)
    if (!this.isValidLength(cpf)) return false
    if (this.hasAllDigitsEqual(cpf)) return false

    const checkDigit1 = this.calculateDigit(cpf, 10)
    const checkDigit2 = this.calculateDigit(cpf, 11)
    const checkDigit = `${checkDigit1}${checkDigit2}`
    return this.extractCheckDigit(cpf) === checkDigit
  }

  private clean(cpf: string) {
    return cpf.replace(/\D/g, '')
  }

  private isValidLength(cpf: string) {
    return cpf.length === 11
  }

  private hasAllDigitsEqual(cpf: string) {
    const [firstDigit] = cpf
    return [...cpf].every((digit) => digit === firstDigit)
  }

  private calculateDigit(cpf: string, factor: number) {
    let sum = 0
    for (const digit of cpf) {
      if (factor > 1) sum += parseInt(digit) * factor--
    }
    const rest = sum % 11
    return rest < 2 ? 0 : 11 - rest
  }

  private extractCheckDigit(cpf: string) {
    return cpf.substring(9)
  }

  getValue() {
    return this.value
  }
}