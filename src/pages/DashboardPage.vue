<script setup>

import { ref, onMounted, computed } from 'vue'
import { useDataStore } from '../stores/dataStore'
import { useRouter } from 'vue-router'
import Navigation from '../components/Navigation.vue'
import trashIcon from '../assets/smece.png'
import { useAuthStore } from '../stores/auth'


// =============================
// PINIA I ROUTER
// =============================

const dataStore = useDataStore()
const router = useRouter()
const authStore = useAuthStore()

// ZA POPUP BRISANJA VOZILA

const showDeleteModal = ref(false)
const vehicleToDelete = ref(null)


// =============================
// UČITAVANJE VOZILA
// =============================

onMounted(() => {
  dataStore.getVehicles()
  dataStore.getAllServices()
})


// =============================
// STATISTIKA
// =============================

const totalVehicles = computed(() => {
  return dataStore.vehicles.length
})

const totalServices = computed(() => {
  return dataStore.services.length
})

const totalCost = computed(() => {
  return dataStore.services.reduce((total, service) => {
    return total + service.price + service.labor
  }, 0)
})


// =============================
// UI VARIJABLE
// =============================

const showUserMenu = ref(false)


// =============================
// DODAVANJE VOZILA
// =============================

const showAddVehicle = ref(false)

const brand = ref('')
const model = ref('')
const year = ref('')
const registration = ref('')
const kilometers = ref('')

const validationError = ref('')


// =============================
// UREĐIVANJE VOZILA
// =============================

const showEditVehicle = ref(false)

const editVehicle = ref(null)

const editBrand = ref('')
const editModel = ref('')
const editYear = ref('')
const editRegistration = ref('')
const editKilometers = ref('')


// =============================
// OTVARANJE DETALJA VOZILA
// =============================

const openVehicle = (id) => {
  router.push(`/vehicle/${id}`)
}

// ZA POPUP

const openDeleteModal = (vehicle) => {
  vehicleToDelete.value = vehicle
  showDeleteModal.value = true
}

const confirmDeleteVehicle = async () => {
  if (!vehicleToDelete.value) {
    return
  }

  await dataStore.deleteVehicle(vehicleToDelete.value.id)

  showDeleteModal.value = false
  vehicleToDelete.value = null
}

// OBRISI VOZILO 

const deleteVehicle = async (id) => {
  const confirmed = confirm(
    'Jeste li sigurni da želite izbrisati ovo vozilo?'
  )

  if (!confirmed) {
    return
  }

  await dataStore.deleteVehicle(id)
}

// =============================
// OTVARANJE UREĐIVANJA VOZILA
// =============================

const openEditVehicle = (vehicle) => {

  editVehicle.value = vehicle.id

  editBrand.value = vehicle.brand
  editModel.value = vehicle.model
  editYear.value = vehicle.year
  editRegistration.value = vehicle.registration
  editKilometers.value = vehicle.kilometers

  showEditVehicle.value = true
}


// =============================
// SPREMANJE IZMJENA
// =============================

const saveEditVehicle = async () => {

  await dataStore.updateVehicle(
    editVehicle.value,
    {
      brand: editBrand.value,
      model: editModel.value,
      year: Number(editYear.value),
      registration: editRegistration.value,
      kilometers: Number(editKilometers.value)
    }
  )

  showEditVehicle.value = false
}


// =============================
// DODAVANJE VOZILA
// =============================

const addVehicle = async () => {

  validationError.value = ''

  if (
    Number(year.value) < 1900 ||
    Number(year.value) > new Date().getFullYear()
  ) {
    validationError.value = 'Godina vozila nije ispravna.'
    return
  }

  if (Number(kilometers.value) < 0) {
    validationError.value = 'Kilometraža ne može biti negativna.'
    return
  }

  await dataStore.addVehicle({
    brand: brand.value,
    model: model.value,
    year: Number(year.value),
    registration: registration.value,
    kilometers: Number(kilometers.value)
  })

  brand.value = ''
  model.value = ''
  year.value = ''
  registration.value = ''
  kilometers.value = ''

  showAddVehicle.value = false
}

</script>


<template>

  <div class="min-h-screen bg-[#0f0f0f] text-white p-6">


    <Navigation />


    <!-- ========================= -->
    <!-- NASLOV -->
    <!-- ========================= -->

    <div class="mb-8">

      <p class="text-gray-400 text-lg">
        Dobrodošli natrag
      </p>

      <h2 class="text-4xl font-bold mt-1">
         {{ authStore.user?.displayName }}
      </h2>

    </div>


    <!-- ========================= -->
    <!-- STATISTIKA -->
    <!-- ========================= -->

    <div class="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">


      <div
        class="bg-[#171717] p-6 rounded-3xl border border-[#2a2a2a]"
      >

        <p class="text-gray-400 text-lg">
          Ukupno vozila
        </p>

        <h3 class="text-4xl font-bold mt-2">
          {{ totalVehicles }}
        </h3>

      </div>


      <div
        class="bg-[#171717] p-6 rounded-3xl border border-[#2a2a2a]"
      >

        <p class="text-gray-400 text-lg">
          Servisni zapisi
        </p>

        <h3 class="text-4xl font-bold mt-2">
          {{ totalServices }}
        </h3>

      </div>


      <div
        class="bg-[#171717] p-6 rounded-3xl border border-[#2a2a2a]"
      >

        <p class="text-gray-400 text-lg">
          Ukupni trošak
        </p>

        <h3 class="text-4xl font-bold mt-2">
          {{ totalCost }} €
        </h3>

      </div>

    </div>


    <!-- ========================= -->
    <!-- POPIS VOZILA -->
    <!-- ========================= -->

    <div>

      <div class="flex items-center justify-between mb-5">

        <h2 class="text-2xl font-bold">
          Moja vozila
        </h2>


        <button
          @click="showAddVehicle = true"
          class="bg-orange-500 hover:bg-orange-600 transition px-5 py-3 rounded-2xl font-semibold"
        >
          + Dodaj vozilo
        </button>

      </div>


      <div>


        <!-- NEMA VOZILA -->

        <div
          v-if="dataStore.vehicles.length === 0"
          class="bg-[#171717] border border-[#2a2a2a] rounded-3xl p-10 text-center"
        >

          <h3 class="text-xl font-semibold mb-2">
            Nemate dodanih vozila
          </h3>

          <p class="text-gray-400 mb-6">
            Dodajte svoje prvo vozilo kako biste pratili servisnu povijest.
          </p>


          <button
            @click="showAddVehicle = true"
            class="bg-orange-500 hover:bg-orange-600 transition px-5 py-3 rounded-2xl font-semibold"
          >
            + Dodaj prvo vozilo
          </button>

        </div>


        <!-- POSTOJE VOZILA -->

        <div
          v-else
          class="grid grid-cols-1 md:grid-cols-2 gap-5"
        >


          <!-- KARTICA VOZILA -->

          <div
            v-for="vehicle in dataStore.vehicles"
            :key="vehicle.id"
            @click="openVehicle(vehicle.id)"
            class="bg-[#171717] border border-[#2a2a2a] rounded-3xl p-6 cursor-pointer"
          >

            <h3 class="text-2xl font-bold">
              {{ vehicle.brand }} {{ vehicle.model }}
            </h3>


            <p class="text-gray-400 mt-2">
              Godina: {{ vehicle.year }}
            </p>


            <p class="text-gray-400">
              Registracija: {{ vehicle.registration }}
            </p>


            <p class="text-gray-400">
              Kilometraža: {{ vehicle.kilometers }} km
            </p>


            <!-- UREDI -->

            <button
              @click.stop="openEditVehicle(vehicle)"
              class="mt-4 mr-2 bg-[#046CC6] hover:bg-[#035aa5] transition px-4 py-2 rounded-xl font-semibold"
            >
              Uredi podatke o vozilu
            </button>


            <!-- OBRIŠI -->

            <button @click.stop="openDeleteModal(vehicle)"
              class="mt-4 bg-red-600 hover:bg-red-700 transition px-4 py-2 rounded-xl font-semibold">
              Obriši vozilo
            </button>

          </div>

        </div>

      </div>

    </div>


    <!-- ========================= -->
    <!-- MODAL ZA DODAVANJE VOZILA -->
    <!-- ========================= -->

    <div
      v-if="showAddVehicle"
      class="fixed inset-0 bg-black/70 flex items-center justify-center p-6 z-50"
    >

      <div
        class="w-full max-w-lg bg-[#171717] border border-[#2a2a2a] rounded-3xl p-8"
      >


        <div class="flex items-center justify-between mb-6">

          <h2 class="text-2xl font-bold">
            Dodaj vozilo
          </h2>


          <button
            @click="showAddVehicle = false"
            class="text-gray-400 hover:text-white text-xl"
          >
            ✕
          </button>

        </div>


        <form
          @submit.prevent="addVehicle"
          class="space-y-4"
        >


          <div>

            <label class="text-gray-300 text-sm block mb-2">
              Marka
            </label>


            <input
              v-model="brand"
              type="text"
              placeholder="npr. BMW"
              required
              class="w-full bg-[#111111] border border-[#3a3a3a] rounded-2xl px-5 py-3 text-white outline-none focus:border-orange-500"
            />

          </div>


          <div>

            <label class="text-gray-300 text-sm block mb-2">
              Model
            </label>


            <input
              v-model="model"
              type="text"
              placeholder="npr. 320d"
              required
              class="w-full bg-[#111111] border border-[#3a3a3a] rounded-2xl px-5 py-3 text-white outline-none focus:border-orange-500"
            />

          </div>


          <div>

            <label class="text-gray-300 text-sm block mb-2">
              Godina proizvodnje
            </label>


            <input
              v-model="year"
              type="number"
              min="1900"
              :max="new Date().getFullYear()"
              placeholder="npr. 2020"
              required
              class="w-full bg-[#111111] border border-[#3a3a3a] rounded-2xl px-5 py-3 text-white outline-none focus:border-orange-500"
            />

          </div>


          <div>

            <label class="text-gray-300 text-sm block mb-2">
              Registracija
            </label>


            <input
              v-model="registration"
              type="text"
              placeholder="npr. PU 123 AB"
              required
              class="w-full bg-[#111111] border border-[#3a3a3a] rounded-2xl px-5 py-3 text-white outline-none focus:border-orange-500"
            />

          </div>


          <div>

            <label class="text-gray-300 text-sm block mb-2">
              Kilometraža
            </label>


            <input
              v-model="kilometers"
              type="number"
              min="0"
              placeholder="npr. 85000"
              required
              class="w-full bg-[#111111] border border-[#3a3a3a] rounded-2xl px-5 py-3 text-white outline-none focus:border-orange-500"
            />

          </div>


          <!-- PORUKA O GREŠCI -->

          <p
            v-if="validationError"
            class="text-red-400 text-sm"
          >
            {{ validationError }}
          </p>


          <button
            type="submit"
            class="w-full bg-[#046CC6] hover:bg-[#035aa5] transition py-4 rounded-2xl text-white font-bold"
          >
            Spremi vozilo
          </button>

        </form>

      </div>

    </div>


    <!-- ========================= -->
    <!-- MODAL ZA UREĐIVANJE VOZILA -->
    <!-- ========================= -->

    <div
      v-if="showEditVehicle"
      class="fixed inset-0 bg-black/70 flex items-center justify-center p-6 z-50"
    >

      <div
        class="w-full max-w-lg bg-[#171717] border border-[#2a2a2a] rounded-3xl p-8"
      >


        <div class="flex items-center justify-between mb-6">

          <h2 class="text-2xl font-bold">
            Uredi vozilo
          </h2>


          <button
            @click="showEditVehicle = false"
            class="text-gray-400 hover:text-white text-xl"
          >
            ✕
          </button>

        </div>


        <form
          @submit.prevent="saveEditVehicle"
          class="space-y-4"
        >


          <div>

            <label class="text-gray-300 text-sm block mb-2">
              Marka
            </label>


            <input
              v-model="editBrand"
              type="text"
              required
              class="w-full bg-[#111111] border border-[#3a3a3a] rounded-2xl px-5 py-3 text-white outline-none focus:border-orange-500"
            />

          </div>


          <div>

            <label class="text-gray-300 text-sm block mb-2">
              Model
            </label>


            <input
              v-model="editModel"
              type="text"
              required
              class="w-full bg-[#111111] border border-[#3a3a3a] rounded-2xl px-5 py-3 text-white outline-none focus:border-orange-500"
            />

          </div>


          <div>

            <label class="text-gray-300 text-sm block mb-2">
              Godina proizvodnje
            </label>


            <input
              v-model="editYear"
              type="number"
              min="1900"
              :max="new Date().getFullYear()"
              required
              class="w-full bg-[#111111] border border-[#3a3a3a] rounded-2xl px-5 py-3 text-white outline-none focus:border-orange-500"
            />

          </div>


          <div>

            <label class="text-gray-300 text-sm block mb-2">
              Registracija
            </label>


            <input
              v-model="editRegistration"
              type="text"
              required
              class="w-full bg-[#111111] border border-[#3a3a3a] rounded-2xl px-5 py-3 text-white outline-none focus:border-orange-500"
            />

          </div>


          <div>

            <label class="text-gray-300 text-sm block mb-2">
              Kilometraža
            </label>


            <input
              v-model="editKilometers"
              type="number"
              min="0"
              required
              class="w-full bg-[#111111] border border-[#3a3a3a] rounded-2xl px-5 py-3 text-white outline-none focus:border-orange-500"
            />

          </div>


          <div class="flex gap-3 justify-end">


            <button
              type="button"
              @click="showEditVehicle = false"
              class="bg-gray-700 hover:bg-gray-600 px-5 py-3 rounded-xl"
            >
              Odustani
            </button>


            <button
              type="submit"
              class="bg-[#046CC6] hover:bg-[#035aa5] px-5 py-3 rounded-xl font-semibold"
            >
              Spremi promjene
            </button>

          </div>

        </form>

      </div>

    </div>

    <!-- POPUP ZA BRISANJE VOZILA -->

<div
  v-if="showDeleteModal"
  class="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
>
  <div
    class="w-full max-w-sm bg-[#171717] border border-[#2a2a2a] rounded-3xl p-8 text-center"
  >

    <img
      :src="trashIcon"
      alt="Brisanje"
      class="w-16 h-16 mx-auto mb-5"
    />

    <h2 class="text-2xl font-bold mb-2">
      Jeste li sigurni?
    </h2>

    <p class="text-gray-400 mb-7">
      Vozilo će biti trajno izbrisano.
    </p>

    <div class="flex gap-3">

      <button
        @click="showDeleteModal = false"
        class="flex-1 bg-[#263143] hover:bg-[#334155] transition py-3 rounded-xl font-semibold"
      >
        Poništi
      </button>

      <button
        @click="confirmDeleteVehicle"
        class="flex-1 bg-red-600 hover:bg-red-700 transition py-3 rounded-xl font-semibold"
      >
        Izbriši
      </button>

    </div>

  </div>
</div>
  </div>

</template>