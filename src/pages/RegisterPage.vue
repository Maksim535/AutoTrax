<script setup>

import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const name = ref('')
const email = ref('')
const password = ref('')
const errorMessage = ref('')

const registerUser = async () => {
  errorMessage.value = ''

  try {
    await authStore.register(
      name.value,
      email.value,
      password.value
    )

    router.push('/')

  } catch (error) {
  console.log(error)

  if (error.code === 'auth/email-already-in-use') {
    errorMessage.value = 'Ovaj email je već registriran.'
  } else {
    errorMessage.value = 'Registracija nije uspjela.'
  }
}
}
</script>



<template>
  <div class="min-h-screen bg-[#0f0f0f] flex items-center justify-center px-6">

    <div
      class="w-full max-w-md bg-[#171717]
      border border-[#2b2b2b]
      rounded-[30px]
      p-8
      shadow-2xl">
      <div class="text-center mb-8">

        <h1 class="text-5xl font-bold text-white">
          Izradi
          <span class="text-orange-500">
            Račun
          </span>
        </h1>

        <p class="text-gray-400 mt-3">
          Registracija na AutoTrax
        </p>

      </div>

      <form @submit.prevent="registerUser" class="space-y-5">

        <div>
          <label class="text-gray-300 text-sm block mb-2">
            Puno ime
          </label>

          <input v-model="name"
            type="text"
            placeholder="Unesite ime"
            class="w-full bg-[#111111]
            border border-[#3a3a3a]
            rounded-2xl
            px-5 py-4
            text-white
            outline-none
            focus:border-orange-500"
          />

        </div>

       
        <div>
          <label class="text-gray-300 text-sm block mb-2">
            Email adresa
          </label>

          <input v-model="email"
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

        <div>
          <label class="text-gray-300 text-sm block mb-2">
            Lozinka
          </label>

          <input v-model="password"
            type="password"
            placeholder="Unesite lozinku"
            class="w-full bg-[#111111]
            border border-orange-500
            rounded-2xl
            px-5 py-4
            text-white
            outline-none"/>

        </div>

    
        <button type="submit"
          class="w-full
          bg-orange-500
          hover:bg-orange-600
          transition
          py-4
          rounded-2xl
          text-white
          font-bold
          text-lg">
          Registracija
        </button>

        </form>

      <p
        v-if="errorMessage"
        class="text-red-500 text-sm text-center mt-4"
      >
        {{ errorMessage }}
      </p>

      <div class="text-center mt-7">

        <span class="text-gray-400">
          Već imate račun?
        </span>

        <button @click="router.push('/')"
        class="text-orange-500 hover:text-orange-400 mt-2">
        Prijavite se
        </button>

      </div>

    

    </div>

  </div>
</template>
