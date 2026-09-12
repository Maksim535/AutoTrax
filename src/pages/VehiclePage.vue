<script setup>

import { computed, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useDataStore } from '../stores/dataStore'

const route = useRoute()
const dataStore = useDataStore()

const showAddService = ref(false)

const serviceName = ref('')
const serviceDescription = ref('')
const servicePrice = ref('')
const serviceKilometers = ref('')
const serviceDate = ref('')

const vehicle = computed(() => {
  return dataStore.vehicles.find(
    (vehicle) => vehicle.id === route.params.id
  )
})

onMounted(() => {
  dataStore.getServices(route.params.id)
})

const addService = async () => {
  await dataStore.addService({
    vehicleId: vehicle.value.id,
    name: serviceName.value,
    description: serviceDescription.value,
    price: Number(servicePrice.value),
    kilometers: Number(serviceKilometers.value),
    date: serviceDate.value
  })

  serviceName.value = ''
  serviceDescription.value = ''
  servicePrice.value = ''
  serviceKilometers.value = ''
  serviceDate.value = ''

  showAddService.value = false
}

</script>

<template>

  <div class="min-h-screen bg-[#0f0f0f] text-white p-6">

    <button
      @click="$router.push('/dashboard')"
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

      <button
        @click="showAddService = true"
        class="mt-6 bg-orange-500 hover:bg-orange-600 transition px-5 py-3 rounded-2xl font-semibold"
      >
        + Dodaj servis
      </button>

    </div>

    <div v-else>

      <h1 class="text-3xl font-bold">
        Vozilo nije pronađeno
      </h1>

    </div>

    <div
      v-if="showAddService"
      class="fixed inset-0 bg-black/70 flex items-center justify-center p-6"
    >

      <div
        class="bg-[#171717] border border-[#2a2a2a] rounded-3xl p-6 w-full max-w-lg"
      >

        <h2 class="text-2xl font-bold mb-6">
          Dodaj servis
        </h2>

        <form @submit.prevent="addService"
            class="space-y-4">

          <input
            v-model="serviceName"
            type="text"
            placeholder="Naziv servisa"
            required
            class="w-full bg-[#0f0f0f] border border-[#2a2a2a] rounded-xl px-4 py-3"
          />

          <textarea
            v-model="serviceDescription"
            placeholder="Opis servisa"
            class="w-full bg-[#0f0f0f] border border-[#2a2a2a] rounded-xl px-4 py-3"
          ></textarea>

          <input
            v-model="servicePrice"
            type="number"
            placeholder="Cijena (€)"
            required
            class="w-full bg-[#0f0f0f] border border-[#2a2a2a] rounded-xl px-4 py-3"
          />

          <input
            v-model="serviceKilometers"
            type="number"
            placeholder="Kilometraža"
            required
            class="w-full bg-[#0f0f0f] border border-[#2a2a2a] rounded-xl px-4 py-3"
          />

          <input
            v-model="serviceDate"
            type="date"
            required
            class="w-full bg-[#0f0f0f] border border-[#2a2a2a] rounded-xl px-4 py-3"
          />

          <div class="flex gap-3 justify-end">

            <button
              type="button"
              @click="showAddService = false"
              class="bg-gray-700 hover:bg-gray-600 px-5 py-3 rounded-xl"
            >
              Odustani
            </button>

            <button
              type="submit"
              class="bg-orange-500 hover:bg-orange-600 px-5 py-3 rounded-xl font-semibold"
            >
              Spremi servis
            </button>

          </div>

        </form>

      </div>

    </div>
<div
  v-if="vehicle"
  class="mt-10">

  <h2 class="text-2xl font-bold mb-4">
    Povijest servisa
  </h2>

  <div
    v-if="dataStore.services.length === 0"
    class="bg-[#171717] border border-[#2a2a2a] rounded-3xl p-6 text-gray-400"
  >
    Nema evidentiranih servisa.
  </div>

  <div
    v-else
    v-for="service in dataStore.services"
    :key="service.id"
    class="bg-[#171717] border border-[#2a2a2a] rounded-3xl p-5 mb-4"
  >

    <h3 class="text-xl font-bold">
      {{ service.name }}
    </h3>

    <p class="text-gray-400 mt-2">
      {{ service.description }}
    </p>

    <p class="text-gray-400">
      Cijena: {{ service.price }} €
    </p>

    <p class="text-gray-400">
      Kilometraža: {{ service.kilometers }} km
    </p>

    <p class="text-gray-400">
      Datum: {{ service.date }}
    </p>

  </div>

</div>
  </div>

</template>