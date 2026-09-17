<script setup>
import Navigation from '../components/Navigation.vue'
import { useAuthStore } from '../stores/auth'

const authStore = useAuthStore()
</script>

<template>
  <div class="min-h-screen bg-[#1f1f1f] text-white px-6 py-6">

    <Navigation />

    <div class="max-w-4xl mx-auto">

      <h2 class="text-4xl font-bold">
        Moj račun
      </h2>

      <p class="text-gray-400 mt-2">
        Podaci o vašem korisničkom računu
      </p>

      <div class="bg-[#2a2a2a] rounded-2xl p-6 mt-8">

        <div class="mb-6">
          <p class="text-gray-400 text-sm">
            Ime i prezime
          </p>

          <p class="text-xl font-semibold mt-1">
            {{ authStore.user?.displayName }}
          </p>
        </div>

        <div>
          <p class="text-gray-400 text-sm">
            Email
          </p>

          <p class="text-xl font-semibold mt-1">
            {{ authStore.user?.email }}
          </p>
        </div>

      </div>

    </div>

  </div>
</template>