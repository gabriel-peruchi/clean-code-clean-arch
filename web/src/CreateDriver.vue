<template>
  <div>
    <input v-model="name" type="text" class="driver-name" />
    <input v-model="email" type="text" class="driver-email" />
    <input v-model="document" type="text" class="driver-document" />
    <input v-model="carPlate" type="text" class="driver-car-plate" />
    <button class="create-driver-button" @click="createDriver">Create driver</button>
    <div class="driver-id">{{ driverId }}</div>
  </div>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue'

import { DriverGateway } from './infra/gateway/DriverGateway'

const driverGateway = inject('driverGateway') as DriverGateway

const name = ref('')
const email = ref('')
const document = ref('')
const carPlate = ref('')
const driverId = ref('')

async function createDriver() {
  const input = {
    name: name.value,
    email: email.value,
    document: document.value,
    carPlate: carPlate.value
  }
  driverId.value = await driverGateway.create(input)
}
</script>

<style scoped></style>
