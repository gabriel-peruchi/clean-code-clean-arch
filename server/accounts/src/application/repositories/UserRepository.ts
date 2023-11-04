import { User } from "../../domain/user/User"

export interface UserRepository {
  create(user: User): Promise<void>
  findByEmail(userId: string): Promise<User>
}