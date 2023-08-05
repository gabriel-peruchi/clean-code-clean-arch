<template>
  <div>
    <input v-model="rideBuilder.passengerId" type="text" class="ride-passenger-id" />
    <input v-model="rideBuilder.fromLat" type="text" class="ride-from-lat" />
    <input v-model="rideBuilder.fromLong" type="text" class="ride-from-long" />
    <input v-model="rideBuilder.toLat" type="text" class="ride-to-lat" />
    <input v-model="rideBuilder.toLong" type="text" class="ride-to-long" />
    <button class="calculate-ride-button" @click="calculateRide">Calculate ride</button>
    <div v-if="ride" >
      <div class="ride-price">{{ ride.price }}</div>
      <div class="ride-id">{{ ride.id }}</div>
      <button class="request-ride-button" @click="requestRide">Calculate ride</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { inject, onMounted, ref } from 'vue'
import { RideBuilder } from '../domain/Ride'
import { RideGateway } from '../infra/gateway/RideGateway'
import { GeoLocation } from '../infra/geolocation/GeoLocation'

const rideGateway = inject('rideGateway') as RideGateway
const geoLocation = inject('geoLocation') as GeoLocation

const ride = ref()
const rideBuilder = ref(new RideBuilder())

async function calculateRide() {
  try {
    ride.value = rideBuilder.value.build()
    ride.value.price = await rideGateway.calculate(ride.value)
  } catch (e: any) {
  }
}

async function requestRide() {
  try {
    ride.value.id = await rideGateway.request(ride.value)
  } catch (e: any) {
  }
}

onMounted(async () => {
  const coordinate = await geoLocation.getCoord()
  rideBuilder.value.fromLat = coordinate.lat
  rideBuilder.value.fromLong = coordinate.long
})
</script>

<style scoped></style>