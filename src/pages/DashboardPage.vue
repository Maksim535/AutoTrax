<script setup>

import { ref } from 'vue'



</script>



<template>

<div class="min-h-screen bg-[#0f0f0f] text-white p-6">


    <div class="flex items-center justify-between mb-8">
      <div>
        <p class="text-gray-400 text-sm">Dobrodošli natrag</p>

        <h1 class="text-5xl font-bold mt-1">
          Auto<span class="text-orange-500">Trax</span>
        </h1>
      </div>

      
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">

      <div class="bg-[#171717] p-6 rounded-3xl border border-[#2a2a2a]">
        <p class="text-gray-400 text-sm">
        <h2 class="text-4xl font-bold mt-2">
          {{ totalServices }}
        </h2>
      </div>

    </div>

</div>


</template>




<script scoped>




</script>