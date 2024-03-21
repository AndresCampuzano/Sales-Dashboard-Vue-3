<template>
  <header>
    <div>
      <h1 class="text-blue-600">HEADER</h1>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header>
  <RouterView />
</template>

<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<style scoped>
nav a {
  display: inline-block;
  padding: 0 1rem;
}
</style>
