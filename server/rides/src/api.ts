import express from 'express'

import { CalculateRide } from './application/useCases/CalculateRide'
import { CreatePassenger } from './application/useCases/CreatePassenger'
import { GetPassenger } from './application/useCases/GetPassenger'
import { CreateDriver } from './application/useCases/CreateDriver'
import { GetDriver } from './application/useCases/GetDriver'

const app = express()
app.use(express.json())

app.post('/calculate-ride', async (req, res) => {
  try {
    const calculateRide = new CalculateRide()
    const output = await calculateRide.execute(req.body)
    return res.json(output)
  } catch (error: any) {
    return res.status(404).send(error.message)
  }
})

app.post("/passengers", async (req, res) => {
  try {
    const createPassenger = new CreatePassenger()
    const output = await createPassenger.execute(req.body)
    res.json(output)
  } catch (e: any) {
    res.status(422).send(e.message)
  }
})

app.get("/passengers/:passengerId", async (req, res) => {
  const getPassenger = new GetPassenger()
  const output = await getPassenger.execute({ passengerId: req.params.passengerId })
  res.json(output)
})

app.post("/drivers", async function (req, res) {
  try {
    const createDriver = new CreateDriver()
    const output = await createDriver.execute(req.body)
    res.json(output)
  } catch (e: any) {
    res.status(422).send(e.message)
  }
})

app.get("/drivers/:driverId", async (req, res) => {
  const getDriver = new GetDriver()
  const output = await getDriver.execute({ driverId: req.params.driverId })
  res.json(output)
})

app.listen(3333, () => console.log('Server is running!'))