<template>
  <main>
    <form class="m-6" @submit.prevent="onSubmit">
      <FormInput
        v-model="email"
        id="email"
        type="email"
        placeholder="correo@tienda.com"
        label="Correo"
        required
      />
      <FormInput
        v-model="password"
        id="password"
        type="password"
        placeholder="•••••••••"
        label="Contraseña"
        required
      />
      <FormButton text="Iniciar sesión" type="submit" />
    </form>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import FormInput from '@/components/form-inputs/FormInput.vue'
import FormButton from '@/components/form-inputs/FormButton.vue'

const email = ref('')
const password = ref('')

function onSubmit(): void {
  console.log(email.value)
  console.log(password.value)
}
</script>
