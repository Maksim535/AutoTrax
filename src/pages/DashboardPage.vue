<script setup>
</script>

<template>
  <div class="min-h-screen bg-[#0f0f0f] text-white p-6">

    <!-- HEADER -->
    <div class="flex items-center justify-between mb-8">

      <!-- LOGO -->
      <div>
        <h1 class="text-2xl font-bold text-white">
          Auto<span class="text-[#046CC6]">Trax</span>
        </h1>
      </div>

      <!-- NAVIGACIJA -->
      <div class="flex items-center gap-2">

        <button
          class="bg-[#046CC6] text-white px-4 py-2 rounded-xl text-sm font-medium transition hover:bg-[#035aa5]"
        >
          Početna
        </button>

        <button
          class="text-gray-400 hover:text-white px-4 py-2 rounded-xl text-sm font-medium transition"
        >
          Moja vozila
        </button>

        <button
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
        <button
          class="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-black font-bold text-sm"
        >
          ML
        </button>

      </div>

    </div>

    <!-- NASLOV -->
    <div class="mb-8">

      <p class="text-gray-400 text-sm">
        Dobrodošli natrag
      </p>

      <h2 class="text-4xl font-bold mt-1">
        Početna
      </h2>

    </div>

    <!-- STATS -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">

      <div class="bg-[#171717] p-6 rounded-3xl border border-[#2a2a2a]">
        <p class="text-gray-400 text-sm">
          Ukupno vozila
        </p>

        <h3 class="text-4xl font-bold mt-2">
          0
        </h3>
      </div>

      <div class="bg-[#171717] p-6 rounded-3xl border border-[#2a2a2a]">
        <p class="text-gray-400 text-sm">
          Servisni zapisi
        </p>

        <h3 class="text-4xl font-bold mt-2">
          0
        </h3>
      </div>

      <div class="bg-[#171717] p-6 rounded-3xl border border-[#2a2a2a]">
        <p class="text-gray-400 text-sm">
          Ukupni trošak
        </p>

        <h3 class="text-4xl font-bold mt-2">
          0 €
        </h3>
      </div>

    </div>

    <!-- VOZILA -->
    <div>

      <div class="flex items-center justify-between mb-5">

        <h2 class="text-2xl font-bold">
          Moja vozila
        </h2>

        <button
          class="bg-orange-500 hover:bg-orange-600 transition px-5 py-3 rounded-2xl font-semibold"
        >
          + Dodaj vozilo
        </button>

      </div>

      <div class="bg-[#171717] border border-[#2a2a2a] rounded-3xl p-10 text-center">

        <h3 class="text-xl font-semibold mb-2">
          Nemate dodanih vozila
        </h3>

        <p class="text-gray-400 mb-6">
          Dodajte svoje prvo vozilo kako biste pratili servisnu povijest.
        </p>

        <button
          class="bg-orange-500 hover:bg-orange-600 transition px-5 py-3 rounded-2xl font-semibold"
        >
          + Dodaj prvo vozilo
        </button>

      </div>

    </div>

  </div>
</template>