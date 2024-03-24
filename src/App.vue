<template>
  <header class="max-w-lg m-auto mt-10">
    <div>
      <div class="flex">
        <template v-if="!store.user">
          <div class="animate-pulse flex space-x-4">
            <div class="rounded-full bg-slate-700 h-16 w-16"></div>
            <div class="flex-1 space-y-6 py-2">
              <div class="h-2 bg-slate-700 rounded"></div>
              <div class="space-y-3">
                <div class="grid grid-cols-3 gap-4">
                  <div class="h-2 bg-slate-700 rounded col-span-2"></div>
                </div>
              </div>
            </div>
          </div>
        </template>
        <template v-else>
          <img
            :src="store.user?.photoURL || ''"
            :alt="store.user?.displayName || ''"
            class="rounded-full h-12 w-12"
          />
          <div class="ml-3 flex w-full items-center">
            <h3 class="text-2xl">Hola, {{ store.user?.displayName?.split(' ')[0] }}</h3>
          </div>
        </template>
      </div>

      <nav
        class="divide-slate-700 grid grid-cols-2 divide-x text-center h-16 items-center rounded-md"
      >
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
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

<style scoped></style>
