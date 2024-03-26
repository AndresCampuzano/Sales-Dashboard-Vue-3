<template>
  <header v-if="store.user" class="max-w-lg m-auto mt-10">
    <div>
      <div class="flex m-3">
        <img :src="photo" :alt="userOrEmail" class="rounded-full h-12 w-12" />
        <div class="ml-3 w-full items-center">
          <h3 class="text-2xl">Hola, {{ formattedUserOrEmail }}</h3>
          <p @click="onLogOut" class="underline cursor-pointer hover:opacity-80">Cerrar sesión</p>
        </div>
      </div>
    </div>
  </header>
  <RouterView />
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import { computed, onBeforeMount } from 'vue'
import { authStore } from '@/stores/auth'
import router from '@/router'

const store = authStore()

onBeforeMount(async () => {
  await store.init()
})

async function onLogOut() {
  await store.logoutFirebase()
  await router.push('/login')
}

const photo = computed<string>(() => {
  return store.user?.photoURL || '/bunny.jpeg'
})

const userOrEmail = computed<string>(() => {
  return store.user?.displayName || store.user?.email || ''
})

const formattedUserOrEmail = computed<string>(() => {
  return (
    store.user?.displayName?.split(' ')[0] ||
    getUsernameFromEmail(store.user?.email as string) ||
    ''
  )
})

/**
 * Extracts the username from the given email address.
 *
 * @param {string} email - The email address from which to extract the username.
 *
 * @return {string|null} The username extracted from the email address, or null if no match found.
 */
function getUsernameFromEmail(email: string): string | null {
  // Regular expression to match the text before the @ symbol
  const regex = /^[^@]+/
  // Extract the username from the email using the regex
  const match = email.match(regex)
  // Return the username (or null if no match found)
  return match ? match[0] : null
}
</script>

<style scoped></style>
