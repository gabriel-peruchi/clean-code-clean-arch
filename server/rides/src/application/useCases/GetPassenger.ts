import pgp from 'pg-promise'

type GetPassengerInput = {
  passengerId: string
}

type GetPassengerOutput = {
  id: string
  name: string
  email: string
  document: string
}

export class GetPassenger {
  constructor() { }

  async execute({ passengerId }: GetPassengerInput): Promise<GetPassengerOutput> {
    const connection = pgp()("postgres://postgres:admin@localhost:5432/postgres")
    const [passengerData] = await connection.query("select * from passengers where id = $1", [passengerId])
    await connection.$pool.end()
    return {
      id: passengerData.id,
      name: passengerData.name,
      email: passengerData.email,
      document: passengerData.document
    }
  }
}
