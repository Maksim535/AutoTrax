<script setup>

import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useDataStore } from '../stores/dataStore'
import Navigation from '../components/Navigation.vue'

const router = useRouter()
const dataStore = useDataStore()

onMounted(() => {
  dataStore.getAllServices()
  dataStore.getVehicles()
})

const totalCost = computed(() => {
  return dataStore.services.reduce((total, service) => {
    return total + service.price + service.labor
  }, 0)
})

const getVehicleName = (vehicleId) => {
  const vehicle = dataStore.vehicles.find(
    (vehicle) => vehicle.id === vehicleId
  )

  if (!vehicle) {
    return 'Nepoznato vozilo'
  }

  return `${vehicle.brand} ${vehicle.model}`
}

const openVehicle = (vehicleId) => {
  router.push('/vehicle/' + vehicleId)
}

</script>


<template>

  <div class="min-h-screen bg-[#0f0f0f] text-white p-6">

    <Navigation />


    <!-- NASLOV -->

    <div class="mb-8">

      <h2 class="text-3xl font-bold">
        Servisi
      </h2>

      <p class="text-gray-400 mt-2">
        Pregled svih servisnih zapisa
      </p>

    </div>


    <!-- STATISTIKA -->

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">

      <div class="bg-[#171717] border border-[#2a2a2a] rounded-2xl p-6">

        <p class="text-gray-400 text-sm">
          Ukupno servisa
        </p>

        <p class="text-3xl font-bold mt-2">
          {{ dataStore.services.length }}
        </p>

      </div>


      <div class="bg-[#171717] border border-[#2a2a2a] rounded-2xl p-6">

        <p class="text-gray-400 text-sm">
          Ukupno potrošeno
        </p>

        <p class="text-3xl font-bold mt-2">
          {{ totalCost }} €
        </p>

      </div>

    </div>


    <!-- SERVISI -->

    <div
      v-if="dataStore.services.length > 0"
      class="space-y-4"
    >

      <div
        v-for="service in dataStore.services"
        :key="service.id"
        class="bg-[#171717] border border-[#2a2a2a] rounded-2xl p-6"
      >

        <div class="flex items-start justify-between gap-4">

          <div>

            <h3 class="text-xl font-bold">
              {{ service.name }}
            </h3>

            <p class="text-[#046CC6] mt-1">
              {{ getVehicleName(service.vehicleId) }}
            </p>

            <p class="text-gray-400 mt-3">
              {{ service.description }}
            </p>

          </div>


          <button
            @click="openVehicle(service.vehicleId)"
            class="text-sm text-gray-400 hover:text-white transition"
          >
            Vozilo →
          </button>

        </div>


        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-4 border-t border-[#2a2a2a]">

          <div>

            <p class="text-gray-500 text-sm">
              Cijena
            </p>

            <p class="font-medium mt-1">
              {{ service.price }} €
            </p>

          </div>


          <div>

            <p class="text-gray-500 text-sm">
              Rad
            </p>

            <p class="font-medium mt-1">
              {{ service.labor }} €
            </p>

          </div>


          <div>

            <p class="text-gray-500 text-sm">
              Kilometri
            </p>

            <p class="font-medium mt-1">
              {{ service.kilometers }} km
            </p>

          </div>


          <div>

            <p class="text-gray-500 text-sm">
              Datum
            </p>

            <p class="font-medium mt-1">
              {{ service.date }}
            </p>

          </div>

        </div>

      </div>

    </div>


    <!-- NEMA SERVISA -->

    <div
      v-else
      class="bg-[#171717] border border-[#2a2a2a] rounded-2xl p-8 text-center"
    >

      <p class="text-gray-400">
        Trenutno nema servisnih zapisa.
      </p>

    </div>

  </div>

</template>