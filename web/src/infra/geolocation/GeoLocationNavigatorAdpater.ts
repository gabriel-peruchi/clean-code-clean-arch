import { Coordinate } from "../../domain/Coordinate";
import { GeoLocation } from "./GeoLocation";

export class GeoLocationNavigatorAdpater implements GeoLocation {
  async getCoord(): Promise<Coordinate> {
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition((position) => {
        const coordinate = new Coordinate(position.coords.latitude, position.coords.longitude)
        resolve(coordinate)
      })
    })
  }
}