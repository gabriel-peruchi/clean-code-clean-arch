function clean(cpf: string) {
  return cpf.replace(/\D/g, '')
}

function isValidLength(cpf: string) {
  return cpf.length === 11
}

function hasAllDigitsEqual(cpf: string) {
  const [firstDigit] = cpf
  return [...cpf].every((digit) => digit === firstDigit)
}

function calculateDigit(cpf: string, factor: number) {
  let sum = 0
  for (const digit of cpf) {
    if (factor > 1) sum += parseInt(digit) * factor--
  }
  const rest = sum % 11
  return rest < 2 ? 0 : 11 - rest
}

function extractCheckDigit(cpf: string) {
  return cpf.substring(9)
}

export function validate(cpf: string) {
  cpf = clean(cpf)
  if (!isValidLength(cpf)) return false
  if (hasAllDigitsEqual(cpf)) return false

  const checkDigit1 = calculateDigit(cpf, 10)
  const checkDigit2 = calculateDigit(cpf, 11)
  const checkDigit = `${checkDigit1}${checkDigit2}`
  return extractCheckDigit(cpf) === checkDigit
}
