<script setup>

import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import logoutIcon from '../assets/odjava.png'

const router = useRouter()
const showUserMenu = ref(false)
const authStore = useAuthStore()
const showLogoutModal = ref(false)

const logout = async () => {
  await authStore.logout()
  router.push('/')
}


// INICIJALI KORISNIKA

const userInitials = computed(() => {

  const name = authStore.user?.displayName

  if (!name) {
    return 'U'
  }

  const words = name.trim().split(/\s+/)

  if (words.length === 1) {
    return words[0].charAt(0).toUpperCase()
  }

  return (
    words[0].charAt(0) +
    words[1].charAt(0)
  ).toUpperCase()
})

</script>


<template>

  <div class="bg-[#333333] -mx-6 px-6 py-4 mb-8 flex items-center justify-between">

    <!-- LOGO -->

    <div>

      <h1 class="text-2xl font-bold text-white">

        Auto<span class="text-[#046CC6]">Trax</span>

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
          {{ userInitials }}
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
            @click="showLogoutModal = true"
            class="w-full text-left px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition"
          >
            Odjava
          </button>

        </div>

      </div>

    </div>


    <!-- POPUP ZA POTVRDU ODJAVE -->

    <div
      v-if="showLogoutModal"
      class="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
    >

      <div
        class="w-full max-w-sm bg-[#171717] border border-[#2a2a2a] rounded-3xl p-8 text-center"
      >

        <img
          :src="logoutIcon"
          alt="Odjava"
          class="w-16 h-16 mx-auto mb-5"
        />

        <h2 class="text-2xl font-bold mb-2">
          Jeste li sigurni?
        </h2>

        <p class="text-gray-400 mb-7">
          Jeste li sigurni da se želite odjaviti?
        </p>

        <div class="flex gap-3">

          <button
            @click="showLogoutModal = false"
            class="flex-1 bg-[#263143] hover:bg-[#334155] transition py-3 rounded-xl font-semibold"
          >
            Poništi
          </button>

          <button
            @click="logout"
            class="flex-1 bg-red-600 hover:bg-red-700 transition py-3 rounded-xl font-semibold"
          >
            Odjavi se
          </button>

        </div>

      </div>

    </div>

  </div>

</template>