import { CompletedRideStatus } from './CompletedRideStatus'
import { RideStatus } from './RideStatus'

export class InProgressRideStatus extends RideStatus {
  value: string = 'in_progress'

  request() {
    throw new Error('Invalid status')
  }

  accept() {
    throw new Error('Invalid status')
  }

  start() {
    throw new Error('Invalid status')
  }

  end() {
    this.ride.status = new CompletedRideStatus(this.ride)
  }
}