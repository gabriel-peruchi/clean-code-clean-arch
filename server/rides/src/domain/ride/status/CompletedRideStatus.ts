import { RideStatus } from './RideStatus'

export class CompletedRideStatus extends RideStatus {
  value: string = 'completed'

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
    throw new Error('Invalid status')
  }
}