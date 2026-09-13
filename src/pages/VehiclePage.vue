<script setup>

import { computed, ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useDataStore } from '../stores/dataStore'
import Navigation from '../components/Navigation.vue'

// PINIA STORE I ROUTER
const route = useRoute()
const dataStore = useDataStore()


// DODAVANJE SERVISA
const showAddService = ref(false)

const serviceName = ref('')
const serviceDescription = ref('')
const servicePrice = ref('')
const serviceLaborPrice = ref('')
const serviceKilometers = ref('')
const serviceDate = ref('')


// UREĐIVANJE SERVISA
const showEditService = ref(false)

const editService = ref(null)
const editServiceName = ref('')
const editServiceDescription = ref('')
const editServicePrice = ref('')
const editServiceLaborPrice = ref('')
const editServiceKilometers = ref('')
const editServiceDate = ref('')


// PRONALAŽENJE TRENUTNOG VOZILA
const vehicle = computed(() => {
  return dataStore.vehicles.find(
    (vehicle) => vehicle.id === route.params.id
  )
})


// UČITAVANJE SERVISA ZA TRENUTNO VOZILO
onMounted(() => {
  dataStore.getServices(route.params.id)
})


// SPREMANJE NOVOG SERVISA
const addService = async () => {

  await dataStore.addService({
    vehicleId: vehicle.value.id,
    name: serviceName.value,
    description: serviceDescription.value,
    price: Number(servicePrice.value),
    labor: Number(serviceLaborPrice.value),
    kilometers: Number(serviceKilometers.value),
    date: serviceDate.value
  })

  serviceName.value = ''
  serviceDescription.value = ''
  servicePrice.value = ''
  serviceLaborPrice.value = ''
  serviceKilometers.value = ''
  serviceDate.value = ''

  showAddService.value = false
}


// OTVARANJE UREĐIVANJA SERVISA
const openEditService = (service) => {

  editService.value = service.id

  editServiceName.value = service.name
  editServiceDescription.value = service.description
  editServicePrice.value = service.price
  editServiceLaborPrice.value = service.labor
  editServiceKilometers.value = service.kilometers
  editServiceDate.value = service.date

  showEditService.value = true
}


// SPREMANJE IZMJENA SERVISA
const saveEditService = async () => {

  await dataStore.updateService(
    editService.value,
    {
      name: editServiceName.value,
      description: editServiceDescription.value,
      price: Number(editServicePrice.value),
      labor: Number(editServiceLaborPrice.value),
      kilometers: Number(editServiceKilometers.value),
      date: editServiceDate.value
    }
  )

  showEditService.value = false
}

</script>


<template>

  <div class="min-h-screen bg-[#0f0f0f] text-white px-6 py-10">

    <Navigation />


    <div class="max-w-5xl mx-auto">

      <!-- PODACI O VOZILU -->
      <div v-if="vehicle">

        <h1 class="text-4xl font-bold mb-2">
          {{ vehicle.brand }} {{ vehicle.model }}
        </h1>

        <p class="text-gray-400 mb-8">
          {{ vehicle.year }} • {{ vehicle.registration }}
        </p>


        <!-- INFORMACIJE O VOZILU -->
        <div class="bg-[#171717] border border-[#2a2a2a] rounded-3xl p-6 mb-8">

          <h2 class="text-2xl font-bold mb-6">
            Podaci o vozilu
          </h2>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">

            <div>
              <p class="text-gray-400">
                Marka
              </p>

              <p class="font-semibold">
                {{ vehicle.brand }}
              </p>
            </div>

            <div>
              <p class="text-gray-400">
                Model
              </p>

              <p class="font-semibold">
                {{ vehicle.model }}
              </p>
            </div>

            <div>
              <p class="text-gray-400">
                Godište
              </p>

              <p class="font-semibold">
                {{ vehicle.year }}
              </p>
            </div>

            <div>
              <p class="text-gray-400">
                Registracija
              </p>

              <p class="font-semibold">
                {{ vehicle.registration }}
              </p>
            </div>

            <div>
              <p class="text-gray-400">
                Kilometraža
              </p>

              <p class="font-semibold">
                {{ vehicle.kilometers }} km
              </p>
            </div>

          </div>

        </div>


        <!-- SERVISNA POVIJEST -->
        <div class="flex justify-between items-center mb-6">

          <h2 class="text-2xl font-bold">
            Servisna povijest
          </h2>

          <button
            @click="showAddService = true"
            class="bg-[#046CC6] hover:bg-[#035aa5] transition px-5 py-3 rounded-xl font-semibold"
          >
            + Dodaj servis
          </button>

        </div>


        <!-- POPIS SERVISA -->
        <div
          v-if="dataStore.services.length > 0"
          class="space-y-4"
        >

          <div
            v-for="service in dataStore.services"
            :key="service.id"
            class="bg-[#171717] border border-[#2a2a2a] rounded-3xl p-6"
          >

            <div class="flex justify-between items-start">

              <div>

                <h3 class="text-xl font-bold">
                  {{ service.name }}
                </h3>

                <p class="text-gray-400 mt-2">
                  {{ service.description }}
                </p>

              </div>

              <p class="text-gray-400">
                {{ service.date }}
              </p>

            </div>


            <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">

              <div>

                <p class="text-gray-400">
                  Cijena dijelova/usluge
                </p>

                <p class="font-semibold">
                  {{ service.price }} €
                </p>

              </div>


              <div>

                <p class="text-gray-400">
                  Cijena rada
                </p>

                <p class="font-semibold">
                  {{ service.labor }} €
                </p>

              </div>


              <div>

                <p class="text-gray-400">
                  Kilometraža
                </p>

                <p class="font-semibold">
                  {{ service.kilometers }} km
                </p>

              </div>

            </div>


            <!-- GUMBI ZA SERVIS -->

            <button
              @click="openEditService(service)"
              class="mt-5 mr-2 bg-[#046CC6] hover:bg-[#035aa5] transition px-4 py-2 rounded-xl font-semibold"
            >
              Uredi servis
            </button>


            <button
              @click="dataStore.deleteService(service.id)"
              class="mt-5 bg-red-600 hover:bg-red-700 transition px-4 py-2 rounded-xl font-semibold"
            >
              Obriši servis
            </button>

          </div>

        </div>


        <!-- NEMA SERVISA -->
        <div
          v-else
          class="bg-[#171717] border border-[#2a2a2a] rounded-3xl p-8 text-center"
        >

          <p class="text-gray-400">
            Za ovo vozilo još nema evidentiranih servisa.
          </p>

        </div>

      </div>


      <!-- VOZILO NIJE PRONAĐENO -->
      <div v-else>

        <p class="text-gray-400">
          Vozilo nije pronađeno.
        </p>

      </div>

    </div>


    <!-- MODAL ZA DODAVANJE SERVISA -->

    <div
      v-if="showAddService"
      class="fixed inset-0 bg-black/70 flex items-center justify-center px-4"
    >

      <div
        class="bg-[#171717] border border-[#2a2a2a] rounded-3xl p-8 w-full max-w-lg"
      >

        <h2 class="text-2xl font-bold mb-6">
          Dodaj servis
        </h2>


        <form
          @submit.prevent="addService"
          class="space-y-4"
        >

          <!-- NAZIV SERVISA -->

          <input
            v-model="serviceName"
            type="text"
            placeholder="Naziv servisa"
            required
            class="w-full bg-[#0f0f0f] border border-[#2a2a2a] rounded-xl px-4 py-3 outline-none"
          />


          <!-- OPIS -->

          <textarea
            v-model="serviceDescription"
            placeholder="Opis servisa"
            required
            class="w-full bg-[#0f0f0f] border border-[#2a2a2a] rounded-xl px-4 py-3 outline-none"
          ></textarea>


          <!-- CIJENA DIJELOVA / USLUGE -->

          <input
            v-model="servicePrice"
            type="number"
            min="0"
            step="0.01"
            placeholder="Cijena dijelova/usluge (€)"
            required
            class="w-full bg-[#0f0f0f] border border-[#2a2a2a] rounded-xl px-4 py-3 outline-none"
          />


          <!-- CIJENA RADA -->

          <input
            v-model="serviceLaborPrice"
            type="number"
            min="0"
            step="0.01"
            placeholder="Cijena rada (€)"
            required
            class="w-full bg-[#0f0f0f] border border-[#2a2a2a] rounded-xl px-4 py-3 outline-none"
          />


          <!-- KILOMETRAŽA -->

          <input
            v-model="serviceKilometers"
            type="number"
            min="0"
            placeholder="Kilometraža"
            required
            class="w-full bg-[#0f0f0f] border border-[#2a2a2a] rounded-xl px-4 py-3 outline-none"
          />


          <!-- DATUM -->

          <input
            v-model="serviceDate"
            type="date"
            required
            class="w-full bg-[#0f0f0f] border border-[#2a2a2a] rounded-xl px-4 py-3 outline-none"
          />


          <!-- GUMBI -->

          <div class="flex gap-3 pt-4">

            <button
              type="button"
              @click="showAddService = false"
              class="flex-1 bg-gray-700 hover:bg-gray-600 transition px-4 py-3 rounded-xl font-semibold"
            >
              Odustani
            </button>

            <button
              type="submit"
              class="flex-1 bg-[#046CC6] hover:bg-[#035aa5] transition px-4 py-3 rounded-xl font-semibold"
            >
              Spremi servis
            </button>

          </div>

        </form>

      </div>

    </div>


    <!-- MODAL ZA UREĐIVANJE SERVISA -->

    <div
      v-if="showEditService"
      class="fixed inset-0 bg-black/70 flex items-center justify-center px-4"
    >

      <div
        class="bg-[#171717] border border-[#2a2a2a] rounded-3xl p-8 w-full max-w-lg"
      >

        <h2 class="text-2xl font-bold mb-6">
          Uredi servis
        </h2>


        <form
          @submit.prevent="saveEditService"
          class="space-y-4"
        >

          <!-- NAZIV SERVISA -->

          <input
            v-model="editServiceName"
            type="text"
            placeholder="Naziv servisa"
            required
            class="w-full bg-[#0f0f0f] border border-[#2a2a2a] rounded-xl px-4 py-3 outline-none"
          />


          <!-- OPIS -->

          <textarea
            v-model="editServiceDescription"
            placeholder="Opis servisa"
            required
            class="w-full bg-[#0f0f0f] border border-[#2a2a2a] rounded-xl px-4 py-3 outline-none"
          ></textarea>


          <!-- CIJENA DIJELOVA / USLUGE -->

          <input
            v-model="editServicePrice"
            type="number"
            min="0"
            step="0.01"
            placeholder="Cijena dijelova/usluge (€)"
            required
            class="w-full bg-[#0f0f0f] border border-[#2a2a2a] rounded-xl px-4 py-3 outline-none"
          />


          <!-- CIJENA RADA -->

          <input
            v-model="editServiceLaborPrice"
            type="number"
            min="0"
            step="0.01"
            placeholder="Cijena rada (€)"
            required
            class="w-full bg-[#0f0f0f] border border-[#2a2a2a] rounded-xl px-4 py-3 outline-none"
          />


          <!-- KILOMETRAŽA -->

          <input
            v-model="editServiceKilometers"
            type="number"
            min="0"
            placeholder="Kilometraža"
            required
            class="w-full bg-[#0f0f0f] border border-[#2a2a2a] rounded-xl px-4 py-3 outline-none"
          />


          <!-- DATUM -->

          <input
            v-model="editServiceDate"
            type="date"
            required
            class="w-full bg-[#0f0f0f] border border-[#2a2a2a] rounded-xl px-4 py-3 outline-none"
          />


          <!-- GUMBI -->

          <div class="flex gap-3 pt-4">

            <button
              type="button"
              @click="showEditService = false"
              class="flex-1 bg-gray-700 hover:bg-gray-600 transition px-4 py-3 rounded-xl font-semibold"
            >
              Odustani
            </button>

            <button
              type="submit"
              class="flex-1 bg-[#046CC6] hover:bg-[#035aa5] transition px-4 py-3 rounded-xl font-semibold"
            >
              Spremi promjene
            </button>

          </div>

        </form>

      </div>

    </div>

  </div>

</template>