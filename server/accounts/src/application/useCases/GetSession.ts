import { TokenGenerator } from '../../domain/token/TokenGenerator'

type GetSessionInput = {
  token: string
}

type GetSessionOutput = {
  email: string
}

export class GetSession {
  async execute(input: GetSessionInput): Promise<GetSessionOutput> {
    const payload = TokenGenerator.verify('secret-key', input.token)
    return { email: payload.email }
  }
}
