<template>
  <div>
    <input v-model="driverBuilder.name" type="text" class="driver-name" />
    <input v-model="driverBuilder.email" type="text" class="driver-email" />
    <input v-model="driverBuilder.document" type="text" class="driver-document" />
    <input v-model="driverBuilder.carPlate" type="text" class="driver-car-plate" />
    <button class="create-driver-button" @click="createDriver">Create driver</button>
    <div v-if="driver" class="driver-id">{{ driver.id }}</div>
    <div class="error">{{ error }}</div>
  </div>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue'

import { DriverBuilder } from '../domain/Driver'
import { DriverGateway } from '../infra/gateway/DriverGateway'

const driverGateway = inject('driverGateway') as DriverGateway

const error = ref('')
const driver = ref()
const driverBuilder = ref(new DriverBuilder())

async function createDriver() {
  try {
    driver.value = driverBuilder.value.build()
    driver.value.id = await driverGateway.create(driver.value)
    error.value = ''
  } catch (e: any) {
    error.value = e.message
  }
}
</script>

<style scoped></style>
