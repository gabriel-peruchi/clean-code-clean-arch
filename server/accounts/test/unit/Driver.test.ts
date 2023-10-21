import { Driver } from "../../src/domain/driver/Driver"

it('should create a driver', () => {
  const driver = Driver.create('Gabriel', 'gabriel@hotmail.com', '83432616074', 'AAA9999')
  expect(driver.id).toBeDefined()
  expect(driver.name).toEqual('Gabriel')
  expect(driver.email.value).toEqual('gabriel@hotmail.com')
  expect(driver.document.value).toEqual('83432616074')
  expect(driver.carPlate.value).toEqual('AAA9999')
})

it('should no create a driver with invalid email', () => {
  expect(() => Driver.create('Gabriel', 'gabriel@hotmail', '83432616074', 'AAA9999')).toThrow(new Error('Invalid email'))
})

it('should no create a driver with invalid cpf', () => {
  expect(() => Driver.create('Gabriel', 'gabriel@hotmail.com', '83432616075', 'AAA9999')).toThrow(new Error('Invalid cpf'))
})

it('should no create a driver with invalid car plate', () => {
  expect(() => Driver.create('Gabriel', 'gabriel@hotmail.com', '83432616074', 'AAA999')).toThrow(new Error('Invalid car plate'))
})