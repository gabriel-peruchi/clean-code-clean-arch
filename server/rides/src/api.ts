import pgp from 'pg-promise'
import express from 'express'
import crypto from 'node:crypto'

import { Ride } from './Ride'
import { validate } from './CpfValidator'

const app = express()
app.use(express.json())

app.post('/calculate-ride', (request, response) => {
  try {
    const ride = new Ride()
    for (const segment of request.body.segments) {
      ride.addSegment(segment.distance, new Date(segment.date))
    }
    const price = ride.calculate()
    return response.json({ price })
  } catch (error: any) {
    return response.status(404).send(error.message)
  }
})

app.post("/passengers", async function (req, res) {
  try {
    const connection = pgp()("postgres://postgres:admin@localhost:5432/postgres")
    const passengerId = crypto.randomUUID()
    if (!validate(req.body.document)) throw new Error("Invalid cpf")
    await connection.query("insert into passengers (id, name, email, document) values ($1, $2, $3, $4)", [passengerId, req.body.name, req.body.email, req.body.document])
    await connection.$pool.end()
    res.json({ passengerId })
  } catch (e: any) {
    res.status(422).send(e.message)
  }
})

app.get("/passengers/:passengerId", async function (req, res) {
  const connection = pgp()("postgres://postgres:admin@localhost:5432/postgres")
  const [passengerData] = await connection.query("select * from passengers where id = $1", [req.params.passengerId])
  await connection.$pool.end()
  res.json(passengerData)
})

app.post("/drivers", async function (req, res) {
  try {
    const connection = pgp()("postgres://postgres:admin@localhost:5432/postgres")
    const driverId = crypto.randomUUID()
    if (!validate(req.body.document)) throw new Error("Invalid cpf")
    await connection.query("insert into drivers (id, name, email, document, car_plate) values ($1, $2, $3, $4, $5)", [driverId, req.body.name, req.body.email, req.body.document, req.body.carPlate])
    await connection.$pool.end()
    res.json({ driverId })
  } catch (e: any) {
    res.status(422).send(e.message)
  }
})

app.get("/drivers/:driverId", async function (req, res) {
  const connection = pgp()("postgres://postgres:admin@localhost:5432/postgres")
  const [driverData] = await connection.query("select * from drivers where id = $1", [req.params.driverId])
  await connection.$pool.end()
  res.json({
    driverId: driverData.id,
    name: driverData.name,
    email: driverData.email,
    document: driverData.document,
    carPlate: driverData.car_plate
  })
})

app.listen(3333, () => console.log('Server is running!'))