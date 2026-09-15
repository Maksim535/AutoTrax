<script setup>

import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useDataStore } from '../stores/dataStore'
import Navigation from '../components/Navigation.vue'

const router = useRouter()
const dataStore = useDataStore()

const showPriceInput = ref(null)
const purchasePrice = ref('')

onMounted(() => {
  dataStore.getVehicles()
})

const garageValue = computed(() => {
  return dataStore.vehicles.reduce((total, vehicle) => {
    return total + (Number(vehicle.purchasePrice) || 0)
  }, 0)
})

const openVehicle = (id) => {
  router.push('/vehicle/' + id)
}

const openPriceInput = (vehicle) => {
  showPriceInput.value = vehicle.id
  purchasePrice.value = vehicle.purchasePrice || ''
}

const savePrice = async (vehicle) => {
  await dataStore.updateVehicle(vehicle.id, {
    ...vehicle,
    purchasePrice: Number(purchasePrice.value)
  })

  showPriceInput.value = null
  purchasePrice.value = ''
}

</script>


<template>

  <div class="min-h-screen bg-[#0f0f0f] text-white p-6">

    <Navigation />


    <!-- VRIJEDNOST GARAŽE -->

    <div class="bg-[#171717] border border-[#2a2a2a] rounded-2xl p-6 mb-8">

      <p class="text-gray-400 text-sm">
        Vrijednost garaže
      </p>

      <p class="text-3xl font-bold mt-2">
        {{ garageValue.toLocaleString('hr-HR') }} €
      </p>

    </div>


    <!-- NASLOV -->

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
        class="bg-[#171717] border border-[#2a2a2a] rounded-2xl p-6"
      >

        <h3 class="text-xl font-bold">
          {{ vehicle.brand }} {{ vehicle.model }}
        </h3>

        <p class="text-gray-400 mt-2">
          Godina: {{ vehicle.year }}
        </p>


        <!-- CIJENA -->

        <div class="mt-4">

          <p
            v-if="vehicle.purchasePrice"
            class="text-gray-300"
          >
            Kupovna cijena:
            <span class="font-semibold">
              {{ Number(vehicle.purchasePrice).toLocaleString('hr-HR') }} €
            </span>
          </p>


          <p
            v-else
            class="text-gray-500"
          >
            Kupovna cijena nije unesena.
          </p>


          <button
            @click="openPriceInput(vehicle)"
            class="mt-3 text-sm text-[#046CC6] hover:text-white transition"
          >
            {{ vehicle.purchasePrice ? 'Uredi cijenu' : 'Dodaj cijenu' }}
          </button>


          <!-- UNOS CIJENE -->

          <div
            v-if="showPriceInput === vehicle.id"
            class="mt-4"
          >

            <input
              v-model="purchasePrice"
              type="number"
              min="0"
              placeholder="15000"
              class="w-full bg-[#111111] border border-[#3a3a3a] rounded-xl px-4 py-3 text-white outline-none focus:border-[#046CC6]"
            />


            <div class="flex gap-2 mt-3">

              <button
                @click="savePrice(vehicle)"
                class="bg-[#046CC6] px-4 py-2 rounded-xl text-white text-sm hover:opacity-90 transition"
              >
                Spremi
              </button>

              <button
                @click="showPriceInput = null"
                class="bg-[#222222] px-4 py-2 rounded-xl text-gray-300 text-sm hover:bg-[#2a2a2a] transition"
              >
                Odustani
              </button>

            </div>

          </div>

        </div>


        <!-- DETALJI -->

        <button
          @click="openVehicle(vehicle.id)"
          class="text-[#046CC6] mt-6 text-sm hover:text-white transition"
        >
          Pogledaj detalje →
        </button>

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