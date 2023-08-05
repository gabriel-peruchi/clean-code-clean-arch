import { GeoLocation } from './../../src/infra/geolocation/GeoLocation';
import { mount } from '@vue/test-utils'
import PassengerRide from '../../src/view/PassengerRide.vue'
import { RideGatewayHttp } from '../../src/infra/gateway/RideGatewayHttp'
import { AxiosAdapter } from '../../src/infra/http/AxiosAdapter'
import CreatePassenger from '../../src/view/CreatePassenger.vue'
import { PassengerGatewayHttp } from '../../src/infra/gateway/PassengerGatewayHttp'
import { Coordinate } from '../../src/domain/Coordinate';

function sleep(time: number) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), time)
  })
}

it('should calculate the ride price', async () => {
  const wrapper = mount(PassengerRide, {
    global: {
      provide: {
        rideGateway: new RideGatewayHttp(new AxiosAdapter()),
        geoLocation: {
          async getCoord() {
            return new Coordinate(-27.584905257808835, -48.545022195325124)
          },
        } as GeoLocation
      }
    }
  })
  await wrapper.get('.ride-from-lat').setValue('-27.584905257808835')
  await wrapper.get('.ride-from-long').setValue('-48.545022195325124')
  await wrapper.get('.ride-to-lat').setValue('-27.496887588317275')
  await wrapper.get('.ride-to-long').setValue('-48.522234807851476')
  await wrapper.get('.calculate-ride-button').trigger('click')
  await sleep(200)
  expect(wrapper.get('.ride-price').text()).toBe('21')
})

it('should request a ride', async () => {
  const wrapperCreatePassenger = mount(CreatePassenger, {
    global: {
      provide: {
        passengerGateway: new PassengerGatewayHttp(new AxiosAdapter())
      }
    }
  })
  await wrapperCreatePassenger.get('.passenger-name').setValue('Gabriel Peruchi')
  await wrapperCreatePassenger.get('.passenger-email').setValue('gabriel@hotmail.com')
  await wrapperCreatePassenger.get('.passenger-document').setValue('83432616074')
  await wrapperCreatePassenger.get('.create-passenger-button').trigger('click')
  await sleep(200)
  const passengerId = wrapperCreatePassenger.get('.passenger-id').text()
  const wrapperPassengerRide = mount(PassengerRide, {
    global: {
      provide: {
        rideGateway: new RideGatewayHttp(new AxiosAdapter()),
        geoLocation: {
          async getCoord() {
            return new Coordinate(-27.584905257808835, -48.545022195325124)
          },
        } as GeoLocation
      }
    }
  })
  await wrapperPassengerRide.get('.ride-passenger-id').setValue(passengerId)
  await wrapperPassengerRide.get('.ride-from-lat').setValue('-27.584905257808835')
  await wrapperPassengerRide.get('.ride-from-long').setValue('-48.545022195325124')
  await wrapperPassengerRide.get('.ride-to-lat').setValue('-27.496887588317275')
  await wrapperPassengerRide.get('.ride-to-long').setValue('-48.522234807851476')
  await wrapperPassengerRide.get('.calculate-ride-button').trigger('click')
  await sleep(200)
  await wrapperPassengerRide.get('.request-ride-button').trigger('click')
  await sleep(200)
  expect(wrapperPassengerRide.get('.ride-id').text()).toHaveLength(36)
})
