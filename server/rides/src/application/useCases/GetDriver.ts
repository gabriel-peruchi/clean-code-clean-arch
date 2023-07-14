import pgp from 'pg-promise'

type GetDriverInput = {
  driverId: string
}

type GetDriverOutput = {
  id: string
  name: string
  email: string
  document: string
  carPlate: string
}

export class GetDriver {
  constructor() { }

  async execute({ driverId }: GetDriverInput): Promise<GetDriverOutput> {
    const connection = pgp()("postgres://postgres:admin@localhost:5432/postgres")
    const [driverData] = await connection.query("select * from drivers where id = $1", [driverId])
    await connection.$pool.end()
    return {
      id: driverData.id,
      name: driverData.name,
      email: driverData.email,
      document: driverData.document,
      carPlate: driverData.car_plate
    }
  }
}
