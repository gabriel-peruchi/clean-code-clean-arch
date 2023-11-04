import { TokenGenerator } from '../../domain/token/TokenGenerator'
import { UserRepository } from '../repositories/UserRepository'

type LoginInput = {
  email: string
  password: string
}

type LoginOutput = {
  token: string
}

export class Login {
  constructor(readonly userRepository: UserRepository) { }

  async execute(input: LoginInput): Promise<LoginOutput> {
    const user = await this.userRepository.findByEmail(input.email)
    if (!user.password.validate(input.password)) throw new Error('Unauthorized.')
    const token = TokenGenerator.create('secret-key', user.email.value, new Date())
    return { token }
  }
}
