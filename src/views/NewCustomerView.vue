<template>
  <floating-buttons :menu="state.menu" />
  <main>
    <section class="max-w-lg m-auto px-3">
      <h1 class="text-2xl">Nuevo Cliente</h1>
    </section>
  </main>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import FloatingButtons, { type Menu } from '@/components/FloatingButtons.vue'

const state = reactive({
  loading: true,
  menu: [
    {
      label: 'ventas',
      to: '/'
    },
    {
      label: 'gastos',
      to: '/expenses'
    },
    {
      label: 'broches',
      to: '/products'
    },
    {
      label: 'clientes',
      to: '/customers',
      active: true
    }
  ] as Menu[]
})
</script>
