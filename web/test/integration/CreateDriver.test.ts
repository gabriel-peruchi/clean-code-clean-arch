import { mount } from "@vue/test-utils"
import CreateDriver from "../../src/view/CreateDriver.vue"
import { DriverGatewayHttp } from "../../src/infra/gateway/DriverGatewayHttp"
import { AxiosAdapter } from "../../src/infra/http/AxiosAdapter"

function sleep(time: number) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(true), time)
  })
}

it('should create a driver', async function () {
  const wrapper = mount(CreateDriver, {
    global: {
      provide: {
        driverGateway: new DriverGatewayHttp(new AxiosAdapter())
      }
    }
  })
  await wrapper.get('.driver-name').setValue('Gabriel Peruchi')
  await wrapper.get('.driver-email').setValue('gabriel@hotmail.com')
  await wrapper.get('.driver-document').setValue('83432616074')
  await wrapper.get('.driver-car-plate').setValue('AAA9999')
  await wrapper.get('.create-driver-button').trigger('click')
  await sleep(300)
  expect(wrapper.get('.driver-id').text()).toHaveLength(36)
})

it('should not create a invalid driver name', async function () {
  const wrapper = mount(CreateDriver, {
    global: {
      provide: {
        driverGateway: new DriverGatewayHttp(new AxiosAdapter())
      }
    }
  })
  await wrapper.get('.driver-name').setValue('Gabriel')
  await wrapper.get('.driver-email').setValue('gabriel@hotmail.com')
  await wrapper.get('.driver-document').setValue('83432616074')
  await wrapper.get('.driver-car-plate').setValue('AAA9999')
  await wrapper.get('.create-driver-button').trigger('click')
  expect(wrapper.get('.error').text()).toBe('Invalid name')
})

it('should not create a invalid driver email', async function () {
  const wrapper = mount(CreateDriver, {
    global: {
      provide: {
        driverGateway: new DriverGatewayHttp(new AxiosAdapter())
      }
    }
  })
  await wrapper.get('.driver-name').setValue('Gabriel Peruchi')
  await wrapper.get('.driver-email').setValue('gabriel')
  await wrapper.get('.driver-document').setValue('83432616074')
  await wrapper.get('.driver-car-plate').setValue('AAA9999')
  await wrapper.get('.create-driver-button').trigger('click')
  expect(wrapper.get('.error').text()).toBe('Invalid email')
})

it('should not create a invalid driver document', async function () {
  const wrapper = mount(CreateDriver, {
    global: {
      provide: {
        driverGateway: new DriverGatewayHttp(new AxiosAdapter())
      }
    }
  })
  await wrapper.get('.driver-name').setValue('Gabriel Peruchi')
  await wrapper.get('.driver-email').setValue('gabriel@hotmail.com')
  await wrapper.get('.driver-document').setValue('83432616071')
  await wrapper.get('.driver-car-plate').setValue('AAA9999')
  await wrapper.get('.create-driver-button').trigger('click')
  expect(wrapper.get('.error').text()).toBe('Invalid cpf')
})

it('should not create a invalid driver car plate', async function () {
  const wrapper = mount(CreateDriver, {
    global: {
      provide: {
        driverGateway: new DriverGatewayHttp(new AxiosAdapter())
      }
    }
  })
  await wrapper.get('.driver-name').setValue('Gabriel Peruchi')
  await wrapper.get('.driver-email').setValue('gabriel@hotmail.com')
  await wrapper.get('.driver-document').setValue('83432616074')
  await wrapper.get('.driver-car-plate').setValue('AAA999')
  await wrapper.get('.create-driver-button').trigger('click')
  expect(wrapper.get('.error').text()).toBe('Invalid car plate')
})