import { Ride } from './Ride'
import express from 'express'

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

app.listen(3333, () => console.log('Server is running!'))