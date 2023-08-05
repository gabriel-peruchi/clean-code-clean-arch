<template>
  <div>
    <input v-model="passengerBuilder.name" type="text" class="passenger-name" />
    <input v-model="passengerBuilder.email" type="text" class="passenger-email" />
    <input v-model="passengerBuilder.document" type="text" class="passenger-document" />
    <button class="create-passenger-button" @click="createPassenger">Create passenger</button>
    <div v-if="passenger" class="passenger-id">{{ passenger.id }}</div>
    <div class="error">{{ error }}</div>
  </div>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue'

import { PassengerBuilder } from '../domain/Passenger'
import { PassengerGateway } from '../infra/gateway/PassengerGateway'

const passengerGateway = inject('passengerGateway') as PassengerGateway

const error = ref('')
const passenger = ref()
const passengerBuilder = ref(new PassengerBuilder())

async function createPassenger() {
  try {
    passenger.value = passengerBuilder.value.build()
    passenger.value.id = await passengerGateway.create(passenger.value)
    error.value = ''
  } catch (e: any) {
    error.value = e.message
  }
}
</script>

<style scoped></style>
