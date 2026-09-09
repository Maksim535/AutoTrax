<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const errorMessage = ref('')

import { useRouter } from 'vue-router'

const router = useRouter()

const loginUser = () => {
  const savedUser = localStorage.getItem(email.value)

  if(!savedUser){
    errorMessage.value = 'Korisnik ne postoji. '
    return
  }
  const user = JSON.parse(savedUser)

  if(user.password !== password.value) {
    errorMessage.value = 'Pogrešna lozinka. '
    return
  }

localStorage.setItem('loggedInUser', email.value)

router.push('/dashboard')

}

</script>

<template>
  <div class="min-h-screen bg-[#0f0f0f] flex items-center justify-center px-6">

    <div
      class="w-full max-w-md bg-[#171717] rounded-3xl p-8 shadow-2xl border border-[#2a2a2a]"
    >

      <!-- NASLOV -->
      <div class="mb-10 text-center">

        <h1 class="text-5xl font-bold text-white">
          Auto<span class="text-[#046CC6]">Trax</span>
        </h1>

        <p class="text-gray-400 mt-3 text-sm">
          Digitalna povijest servisa vozila
        </p>

      </div>

      <!-- GREŠKA -->
      <div
        v-if="errorMessage"
        class="bg-red-500/30 border border-red-500 text-red-400 px-4 py-3 rounded-2xl mb-5"
      >
        {{ errorMessage }}
      </div>

      <!-- ispuna forme -->
      <form @submit.prevent="loginUser" class="space-y-5">

        <!-- email -->
        <div>

          <label class="text-gray-300 text-sm block mb-2">
            Email adresa
          </label>

          <input
            v-model="email"
            type="email"
            placeholder="Unesite email"
            class="w-full bg-[#111111]
            border border-[#3a3a3a]
            rounded-2xl
            px-5 py-4
            text-white
            outline-none
            focus:border-orange-500"
          />

        </div>

        <!-- lozinka -->
        <div>

          <label class="text-gray-300 text-sm block mb-2">
            Lozinka
          </label>

          <input
            v-model="password"
            type="password"
            placeholder="Unesite lozinku"
            class="w-full bg-[#111111]
            border border-[#3a3a3a]
            rounded-2xl
            px-5 py-4
            text-white
            outline-none
            focus:border-orange-500"
          />

        </div>

        <!-- gumb za prijavu -->
        <button
          type="submit"
          class="w-full
        bg-[#046CC6]
        hover:bg-[#035aa5]
          transition
          py-4
          rounded-2xl
          text-white
          font-bold
          text-lg"
        >
          Prijava
        </button>

      </form>

      <!-- REGISTRACIJA korisnika -->
      <div class="text-center mt-7">

        <p class="text-gray-400">
          Nemate račun?

          <button type="button" @click="router.push('/register')" class="text-orange-500 font-semibold cursor-pointer">
            Registrirajte se
          </button>
        </p>

      </div>

    </div>

  </div>
</template>