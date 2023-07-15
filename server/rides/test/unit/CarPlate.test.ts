import { CarPlate } from "../../src/domain/CarPlate"

it('should validate a valid car plate', () => {
  const carPlate = new CarPlate('AAA9999')
  expect(carPlate).toBeDefined()
})

it('should not validate a invalid car plate', () => {
  expect(() => new CarPlate('AAA999')).toThrow('Invalid car plate')
})