import { PBKDF2Password } from "./PBKDF2Password";
import { PlainPassword } from "./PlainPassword";
import { SHA1Password } from "./SHA1Password";
import { PasswordTypeEnum } from "./User";

export class PasswordFactory {
  static create(passwordType: PasswordTypeEnum) {
    if (passwordType === PasswordTypeEnum.SHA1) return SHA1Password
    if (passwordType === PasswordTypeEnum.PLAIN) return PlainPassword
    if (passwordType === PasswordTypeEnum.PBKDF2) return PBKDF2Password
    throw new Error('Invalid password type.')
  }
}