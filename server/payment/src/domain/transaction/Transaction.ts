export class Transaction {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly email: string,
    readonly amount: number
  ) { }
}