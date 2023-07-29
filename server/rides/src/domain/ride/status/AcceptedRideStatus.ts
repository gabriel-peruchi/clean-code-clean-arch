import { InProgressRideStatus } from './InProgressRideStatus'
import { RideStatus } from './RideStatus'

export class AcceptedRideStatus extends RideStatus {
  value: string = 'accepted'

  request() {
    throw new Error('Invalid status')
  }

  accept() {
    throw new Error('Invalid status')
  }

  start() {
    this.ride.status = new InProgressRideStatus(this.ride)
  }

  end() {
    throw new Error('Invalid status')
  }
}