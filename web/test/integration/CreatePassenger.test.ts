import { mount } from "@vue/test-utils"
import CreatePassenger from "../../src/view/CreatePassenger.vue"
import { PassengerGatewayHttp } from "../../src/infra/gateway/PassengerGatewayHttp"
import { AxiosAdapter } from "../../src/infra/http/AxiosAdapter"

function sleep(time: number) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), time)
  })
}

it('should create a passenger', async function () {
  const wrapper = mount(CreatePassenger, {
    global: {
      provide: {
        passengerGateway: new PassengerGatewayHttp(new AxiosAdapter())
      }
    }
  })
  await wrapper.get('.passenger-name').setValue('Gabriel Peruchi')
  await wrapper.get('.passenger-email').setValue('gabriel@hotmail.com')
  await wrapper.get('.passenger-document').setValue('83432616074')
  await wrapper.get('.create-passenger-button').trigger('click')
  await sleep(300)
  expect(wrapper.get('.passenger-id').text()).toHaveLength(36)
})

it('should not create a invalid passenger name', async function () {
  const wrapper = mount(CreatePassenger, {
    global: {
      provide: {
        passengerGateway: new PassengerGatewayHttp(new AxiosAdapter())
      }
    }
  })
  await wrapper.get('.passenger-name').setValue('Gabriel')
  await wrapper.get('.passenger-email').setValue('gabriel@hotmail.com')
  await wrapper.get('.passenger-document').setValue('83432616074')
  await wrapper.get('.create-passenger-button').trigger('click')
  expect(wrapper.get('.error').text()).toBe('Invalid name')
})

it('should not create a invalid passenger email', async function () {
  const wrapper = mount(CreatePassenger, {
    global: {
      provide: {
        passengerGateway: new PassengerGatewayHttp(new AxiosAdapter())
      }
    }
  })
  await wrapper.get('.passenger-name').setValue('Gabriel Peruchi')
  await wrapper.get('.passenger-email').setValue('gabriel')
  await wrapper.get('.passenger-document').setValue('83432616074')
  await wrapper.get('.create-passenger-button').trigger('click')
  expect(wrapper.get('.error').text()).toBe('Invalid email')
})

it('should not create a invalid passenger document', async function () {
  const wrapper = mount(CreatePassenger, {
    global: {
      provide: {
        passengerGateway: new PassengerGatewayHttp(new AxiosAdapter())
      }
    }
  })
  await wrapper.get('.passenger-name').setValue('Gabriel Peruchi')
  await wrapper.get('.passenger-email').setValue('gabriel@hotmail.com')
  await wrapper.get('.passenger-document').setValue('83432616071')
  await wrapper.get('.create-passenger-button').trigger('click')
  expect(wrapper.get('.error').text()).toBe('Invalid cpf')
})

it('should create a passenger with an error before', async function () {
  const wrapper = mount(CreatePassenger, {
    global: {
      provide: {
        passengerGateway: new PassengerGatewayHttp(new AxiosAdapter())
      }
    }
  })
  await wrapper.get('.passenger-name').setValue('Gabriel')
  await wrapper.get('.passenger-email').setValue('gabriel@hotmail.com')
  await wrapper.get('.passenger-document').setValue('83432616074')
  await wrapper.get('.create-passenger-button').trigger('click')
  expect(wrapper.get('.error').text()).toBe('Invalid name')
  await wrapper.get('.passenger-name').setValue('Gabriel Peruchi')
  await wrapper.get('.create-passenger-button').trigger('click')
  await sleep(300)
  expect(wrapper.get('.passenger-id').text()).toHaveLength(36)
  expect(wrapper.get('.error').text()).toBe('')
})