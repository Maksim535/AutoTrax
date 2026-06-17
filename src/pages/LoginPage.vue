<script setup>
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const errorMessage = ref('')






</script>





<template>
  <div class="min-h-screen bg-[#0f0f0f] flex items-center justify-center px-6">
    <div
      class="w-full max-w-md bg-[#171717] rounded-3xl p-8 shadow-2xl border border-[#2a2a2a]"
    >
    
      <div class="mb-10 text-center">
        <h1 class="text-5xl font-bold text-white">
          Auto<span class="text-orange-500">Trax</span>
        </h1>

        <p class="text-gray-400 mt-3 text-sm">
         Digitalna povijest servisa vozila
        </p>
      </div>

    <div
      v-if="errorMessage" class="bg-red-500/30 border border-red-500
       text-red-400 px-4 py-3 rounded-2xl mb-5">
      
      {{ errorMessage }}
      </div>
    

    <form class="space-y-5">
      
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
            focus:border-orange-500"/>
      </div>

      <div>

    

        <label class="text-gray-300 text-sm block mb-2">
          Lozinka
        </label>

        <input v-model="password"
          type="password"
          placeholder="Unesite lozinku"
          class="w-full bg-[#111111]
            border border-[#3a3a3a]
            rounded-2xl
            px-5 py-4
            text-white
            outline-none
            focus:border-orange-500"/>

        </div>

         <button
          type="submit"
          class="w-full
          bg-orange-500
          hover:bg-orange-600
          transition
          py-4
          rounded-2xl
          text-white
          font-bold
          text-lg">
          
          Prijava

        </button>

      
      </div>

      </form>

   <div class="text-center mt-7">

      <p class="text-gray-400">
          Nemate račun?
    <span
      class="text-orange-500 font-semibold cursor-pointer">
      Registrirajte se
    </span>

  </p>

</div>   

</div>
      
</template>

