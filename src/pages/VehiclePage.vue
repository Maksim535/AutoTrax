<script setup>

import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useDataStore } from '../stores/dataStore'

const route = useRoute()
const dataStore = useDataStore()

const vehicle = computed(() => {
  return dataStore.vehicles.find(
    (vehicle) => vehicle.id === route.params.id
  )
})

</script>

<template>

  <div class="min-h-screen bg-[#0f0f0f] text-white p-6">
  <button @click="$router.push('/dashboard')"
    class="mb-6 bg-[#046CC6] hover:bg-[#035aa5] transition px-5 py-3 rounded-2xl font-semibold"
  >
  ← Natrag na vozila
  </button> 
    <div v-if="vehicle">

      <h1 class="text-3xl font-bold">
        {{ vehicle.brand }} {{ vehicle.model }}
      </h1>

      <p class="text-gray-400 mt-2">
        Godina: {{ vehicle.year }}
      </p>

      <p class="text-gray-400">
        Registracija: {{ vehicle.registration }}
      </p>

      <p class="text-gray-400">
        Kilometraža: {{ vehicle.kilometers }} km
      </p>

    </div>

    <div v-else>
      <h1 class="text-3xl font-bold">
        Vozilo nije pronađeno
      </h1>
    </div>

  </div>

</template>