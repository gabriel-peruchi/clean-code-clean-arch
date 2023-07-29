import { RideRepository } from "../../application/repositories/RideRepository"
import { Coordinate } from "../../domain/distance/Coordinate"
import { Ride } from "../../domain/ride/Ride"
import { DatabaseConnection } from "../database/DatabaseConnection"

export class RideRepositoryDatabase implements RideRepository {
  constructor(readonly connection: DatabaseConnection) { }

  async create(ride: Ride): Promise<void> {
    await this.connection.query(
      "insert into ccca.rides (id, passenger_id, from_lat, from_long, to_lat, to_long, status, request_date) values ($1, $2, $3, $4, $5, $6, $7, $8)",
      [ride.id, ride.passengerId, ride.from.lat, ride.from.long, ride.to.lat, ride.to.long, ride.status, ride.requestDate]
    )
  }

  async update(ride: Ride): Promise<void> {
    await this.connection.query(
      "update ccca.rides set driver_id = $1, status = $2, accept_date = $3, start_date = $4 where id = $5",
      [ride.driverId, ride.status, ride.acceptDate, ride.startDate, ride.id]
    )
  }

  async findById(rideId: string): Promise<Ride> {
    const [rideData] = await this.connection.query("select * from ccca.rides where id = $1", [rideId])
    const ride = new Ride(
      rideData.id,
      rideData.passenger_id,
      new Coordinate(parseFloat(rideData.from_lat), parseFloat(rideData.from_long)),
      new Coordinate(parseFloat(rideData.to_lat), parseFloat(rideData.to_long)),
      rideData.status,
      rideData.request_date
    )
    ride.driverId = rideData.driver_id
    ride.acceptDate = rideData.accept_date
    ride.startDate = rideData.start_date
    return ride
  }
}
