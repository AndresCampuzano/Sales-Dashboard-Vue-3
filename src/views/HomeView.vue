<template>
  <main>
    <form class="m-6" @submit.prevent="onSubmit">
      <Input v-model="email" id="email" type="email" placeholder="correo@shop.com" label="Correo" required/>
      <Input v-model="password" id="password" type="password" placeholder="•••••••••" label="Contraseña" required/>
      <button type="submit" class="bg-slate-800 hover:bg-blue-900 focus:ring-blue-500 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
    </form>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Input from '@/components/inputs/Input.vue'

const email = ref('');
const password = ref('');

function onSubmit(): void {
  console.log(email.value)
  console.log(password.value)
}

</script>
