<script setup>

import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const router = useRouter()
const showUserMenu = ref(false)
const authStore = useAuthStore()

const logout = async () => {
  await authStore.logout()
  router.push('/')
}

</script>


<template>

  <div class="flex items-center justify-between mb-8">

    <!-- LOGO -->

    <div>

      <h1 class="text-2xl font-bold text-white">

        Auto<span class="text-[#046CC6]">
          Trax
        </span>

      </h1>

    </div>


    <!-- NAVIGACIJA -->

    <div class="flex items-center gap-2">

      <button
        @click="router.push('/dashboard')"
        class="text-gray-400 hover:text-white px-4 py-2 rounded-xl text-sm font-medium transition"
      >
        Početna
      </button>


      <button
        @click="router.push('/vehicles')"
        class="text-gray-400 hover:text-white px-4 py-2 rounded-xl text-sm font-medium transition"
      >
        Moja vozila
      </button>


      <button
        @click="router.push('/services')"
        class="text-gray-400 hover:text-white px-4 py-2 rounded-xl text-sm font-medium transition"
      >
        Servisi
      </button>


      <!-- NOTIFIKACIJE -->

      <button
        class="ml-3 w-10 h-10 bg-[#171717] border border-[#2a2a2a] rounded-xl flex items-center justify-center text-gray-300 hover:text-white transition"
      >
        🔔
      </button>


      <!-- KORISNIK -->

      <div class="relative">

        <button
          @click="showUserMenu = !showUserMenu"
          class="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-black font-bold text-sm"
        >
          ML
        </button>


        <!-- DROPDOWN -->

        <div
          v-if="showUserMenu"
          class="absolute right-0 mt-3 w-44 bg-[#171717] border border-[#2a2a2a] rounded-2xl shadow-2xl p-2 z-50"
        >

          <button
            class="w-full text-left px-4 py-3 rounded-xl text-gray-300 hover:bg-[#222222] hover:text-white transition"
          >
            Moj račun
          </button>


          <button
          @click="logout"
            class="w-full text-left px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition"
          >
            Odjava
          </button>

        </div>

      </div>

    </div>

  </div>

</template>