<template>
  <div>
    <input v-model="name" type="text" class="passenger-name" />
    <input v-model="email" type="text" class="passenger-email" />
    <input v-model="document" type="text" class="passenger-document" />
    <button class="create-passenger-button" @click="createPassenger">Create passenger</button>
    <div class="passenger-id">{{ passengerId }}</div>
  </div>
</template>

<script setup lang="ts">
import { inject, ref } from 'vue'

import { PassengerGateway } from './infra/gateway/PassengerGateway'

const passengerGateway = inject('passengerGateway') as PassengerGateway

const name = ref('')
const email = ref('')
const document = ref('')
const passengerId = ref('')

async function createPassenger() {
  const input = {
    name: name.value,
    email: email.value,
    document: document.value
  }
  passengerId.value = await passengerGateway.create(input)
}
</script>

<style scoped></style>
