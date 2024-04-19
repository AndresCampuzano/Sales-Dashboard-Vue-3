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
import { onBeforeMount, ref } from 'vue'
import FormInput from '@/components/form-inputs/FormInput.vue'
import FormButton from '@/components/form-inputs/FormButton.vue'
import { authStore } from '@/stores/auth'
import router from '@/router'
const store = authStore()

const email = ref('')
const password = ref('')

onBeforeMount(async () => {
  if (store.user) {
    await router.push('/')
  } else {
    store.user = null
  }
})

async function onSubmit(): Promise<void> {
  await store.signInWithEmail(email.value, password.value)
  await router.push('/')
}
</script>
