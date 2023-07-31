import { mount } from "@vue/test-utils"
import CreateDriver from "../src/CreateDriver.vue"
import { DriverGateway } from './../src/infra/gateway/DriverGateway'

function sleep(time: number) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), time)
  })
}

it('should create a driver', async function () {
  const driverGateway: DriverGateway = {
    async create(driver: any) {
      return 'e158ddc0-5808-4932-bd69-47243ae23947'
    }
  }
  const wrapper = mount(CreateDriver, {
    global: {
      provide: {
        driverGateway
      }
    }
  })
  await wrapper.get('.driver-name').setValue('Gabriel')
  await wrapper.get('.driver-email').setValue('gabriel@hotmail.com')
  await wrapper.get('.driver-document').setValue('83432616074')
  await wrapper.get('.driver-car-plate').setValue('AAA9999')
  await wrapper.get('.create-driver-button').trigger('click')
  await sleep(300)
  expect(wrapper.get('.driver-id').text()).toHaveLength(36)
})