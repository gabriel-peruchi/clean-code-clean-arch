export function calculate(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const radius = 6371
  const lat1Rad = toRadians(lat1)
  const lon1Rad = toRadians(lon1)
  const lat2Rad = toRadians(lat2)
  const lon2Rad = toRadians(lon2)
  const dLat = lat2Rad - lat1Rad
  const dLon = lon2Rad - lon1Rad
  const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(dLon / 2) ** 2
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distance = radius * c
  return distance
}

function toRadians(degrees: number): number {
  return (degrees * Math.PI) / 180
}