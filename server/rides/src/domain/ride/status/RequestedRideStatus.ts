import { AcceptedRideStatus } from './AcceptedRideStatus'
import { RideStatus } from './RideStatus'

export class RequestedRideStatus extends RideStatus {
  value: string = 'requested'

  request() {
    throw new Error('Invalid status')
  }

  accept() {
    this.ride.status = new AcceptedRideStatus(this.ride)
  }
  
  start() {
    throw new Error('Invalid status')
  }
  
  end() {
    throw new Error('Invalid status')
  }
}