import { mount } from "@vue/test-utils"
import CreatePassenger from "../src/CreatePassenger.vue"
import { PassengerGateway } from "../src/infra/gateway/PassengerGateway"

function sleep(time: number) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), time)
  })
}

it('should create a passenger', async function () {
  const passengerGateway: PassengerGateway = {
    async create(passenger: any) {
      return 'e158ddc0-5808-4932-bd69-47243ae23947'
    }
  }
  const wrapper = mount(CreatePassenger, {
    global: {
      provide: {
        passengerGateway
      }
    }
  })
  await wrapper.get('.passenger-name').setValue('Gabriel')
  await wrapper.get('.passenger-email').setValue('gabriel@hotmail.com')
  await wrapper.get('.passenger-document').setValue('83432616074')
  await wrapper.get('.create-passenger-button').trigger('click')
  await sleep(300)
  expect(wrapper.get('.passenger-id').text()).toHaveLength(36)
})