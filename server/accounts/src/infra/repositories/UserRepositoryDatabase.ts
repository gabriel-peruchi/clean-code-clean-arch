import { User } from '../../domain/user/User'
import { DatabaseConnection } from '../database/DatabaseConnection'
import { UserRepository } from "../../application/repositories/UserRepository"

// Interface Adapter
export class UserRepositoryDatabase implements UserRepository {
  constructor(readonly connection: DatabaseConnection) {}

  async create(user: User): Promise<void> {
    await this.connection.query(
      "insert into ccca.users (id, email, password, password_type, salt) values ($1, $2, $3, $4, $5)", 
      [user.id, user.email.value, user.password.value, user.passwordType, user.password.salt]
    )
  }
  
  async findByEmail(userEmail: string): Promise<User> {
    const [userData] = await this.connection.query("select * from ccca.users where email = $1", [userEmail])
    return User.restore(userData.id, userData.email, userData.password, userData.password_type, userData.salt)
  }
}
