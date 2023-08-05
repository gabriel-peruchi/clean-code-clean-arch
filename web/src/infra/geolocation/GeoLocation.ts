import { Coordinate } from "../../domain/Coordinate";

export interface GeoLocation {
  getCoord(): Promise<Coordinate>
}