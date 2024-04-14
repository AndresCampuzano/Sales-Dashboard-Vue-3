<template>
  <floating-buttons :menu="state.menu" />
  <main>
    <section class="max-w-lg m-auto px-3">
      <h1 class="text-2xl">Gastos y Rendimientos</h1>
      <div class="my-3 p-2.5 bg-gray-800 rounded-md">
        <p class="mb-2 text-base">Abril 2024</p>
        <div>
          <div class="flex">
            <span
              class="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20"
              >Gastos</span
            >
            <div class="flex flex-col">
              <p class="ml-2 text-yellow-400 text-base">COP 35,000</p>
              <p class="ml-2 text-yellow-400 text-base">AUD 100</p>
            </div>
          </div>
          <div class="flex my-2">
            <span
              class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
              >Ganancias</span
            >
            <div class="flex flex-col">
              <p class="ml-2 text-green-400 text-base">COP 75,000</p>
            </div>
          </div>
        </div>
        <hr class="border-slate-700 my-4" />
        <div class="flex flex-col">
          <p class="text-base">Ingresos: COP 110,000</p>
          <p class="text-base">numero de ventas: 3</p>
        </div>
      </div>
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
      label: 'nuevo gasto',
      to: '/expenses/new',
      forward: true
    },
    {
      label: 'broches',
      to: '/products'
    },
    {
      label: 'clientes',
      to: '/customers'
    }
  ] as Menu[]
})
</script>
