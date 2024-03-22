<template>
  <main>
    <h1>HOME</h1>
    <p>user: {{ user?.displayName }}</p>
    <FormButton text="Cerrar sesión" @click="onLogOut" style-type="secondary" />
  </main>
</template>

<script setup lang="ts">
import FormButton from '@/components/form-inputs/FormButton.vue'
import { authStore } from '@/stores/auth'
import router from '@/router'

const { logoutFirebase, user } = authStore()

async function onLogOut() {
  await logoutFirebase()
  await router.push('/login')
}
</script>
