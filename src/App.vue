<template>
  <header>
    <div>
      <h1 class="text-blue-600">HEADER</h1>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/login">Login</RouterLink>
      </nav>
    </div>
  </header>
  <RouterView />
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import { onBeforeMount } from 'vue'
import { authStore } from '@/stores/auth'

const store = authStore()

onBeforeMount(async () => {
  await store.init()
})
</script>

<style scoped>
nav a {
  display: inline-block;
  padding: 0 1rem;
}
</style>
