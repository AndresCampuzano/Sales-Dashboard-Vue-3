<template>
  <main>
    <form class="m-6">
      <div class="mb-6">
        <label for="email" class="block mb-2 text-sm font-medium">Correo</label>
        <input type="email" id="email" class="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400" placeholder="correo@shop.com" required />
      </div>
      <div class="mb-6">
        <label for="password" class="block mb-2 text-sm font-medium">Contraseña</label>
        <input type="password" id="password" class="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400" placeholder="•••••••••" required />
      </div>
      <button type="submit" class="bg-slate-800 hover:bg-blue-900 focus:ring-blue-500 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ">Submit</button>
    </form>
  </main>
</template>

<script setup lang="ts">
</script>
