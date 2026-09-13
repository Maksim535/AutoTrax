<script setup>

import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useDataStore } from '../stores/dataStore'
import Navigation from '../components/Navigation.vue'

const router = useRouter()
const dataStore = useDataStore()

onMounted(() => {
  dataStore.getVehicles()
})

const openVehicle = (id) => {
  router.push('/vehicle/' + id)
}

</script>


<template>

  <div class="min-h-screen bg-[#0f0f0f] text-white p-6">

    <Navigation />

    <div class="mb-8">

      <h2 class="text-3xl font-bold">
        Moja vozila
      </h2>

      <p class="text-gray-400 mt-2">
        Pregled svih vaših vozila
      </p>

    </div>


    <!-- VOZILA -->

    <div
      v-if="dataStore.vehicles.length > 0"
      class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
    >

      <div
        v-for="vehicle in dataStore.vehicles"
        :key="vehicle.id"
        @click="openVehicle(vehicle.id)"
        class="bg-[#171717] border border-[#2a2a2a] rounded-2xl p-6 cursor-pointer hover:border-[#046CC6] transition"
      >

        <h3 class="text-xl font-bold">
          {{ vehicle.brand }} {{ vehicle.model }}
        </h3>

        <p class="text-gray-400 mt-2">
          Godina: {{ vehicle.year }}
        </p>

        <p class="text-[#046CC6] mt-4 text-sm">
          Pogledaj detalje →
        </p>

      </div>

    </div>


    <!-- NEMA VOZILA -->

    <div
      v-else
      class="bg-[#171717] border border-[#2a2a2a] rounded-2xl p-8 text-center"
    >

      <p class="text-gray-400">
        Trenutno nemate dodanih vozila.
      </p>

    </div>

  </div>

</template>