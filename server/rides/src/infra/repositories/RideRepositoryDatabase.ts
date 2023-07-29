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

  async findById(rideId: string): Promise<Ride> {
    const [rideData] = await this.connection.query("select * from ccca.rides where id = $1", [rideId])
    return new Ride(
      rideData.id,
      rideData.passenger_id,
      new Coordinate(parseFloat(rideData.from_lat), parseFloat(rideData.from_long)),
      new Coordinate(parseFloat(rideData.to_lat), parseFloat(rideData.to_long)),
      rideData.status,
      rideData.request_date
    )
  }
}
