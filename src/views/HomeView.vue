<template>
  <floating-buttons :menu="state.menu" />
  <main>
    <section class="max-w-lg m-auto px-3">
      <h1 class="text-2xl">Ventas</h1>
      <template v-if="state.loading">
        <div
          v-for="(_, index) in 15"
          class="my-3 p-2.5 bg-gray-800 rounded-md cursor-pointer"
          :key="index"
        >
          <div class="animate-pulse flex space-x-4">
            <div class="rounded-full bg-slate-700 h-16 w-16"></div>
            <div class="flex-1 space-y-6 py-2">
              <div class="h-2 bg-slate-700 rounded"></div>
              <div class="space-y-3">
                <div class="grid grid-cols-3 gap-4">
                  <div class="h-2 bg-slate-700 rounded col-span-2"></div>
                  <div class="h-2 bg-slate-700 rounded col-span-1"></div>
                </div>
                <div class="h-2 bg-slate-700 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <summary-item v-for="item in state.data" :key="item.id" :data="item" />
    </section>
  </main>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import type { SalesDataTable } from '@/types/types.ts'
import { getSales } from '@/services/sale.service.ts'
import { prepareDataSales } from '@/utils/prepareDataSales.ts'
import SummaryItem from '@/components/SummaryItem.vue'
import FloatingButtons, { type Menu } from '@/components/FloatingButtons.vue'

const state = reactive({
  loading: true,
  data: [] as SalesDataTable[],
  menu: [
    {
      label: 'nueva venta',
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
      to: '/customers'
    }
  ] as Menu[]
})

onMounted(async () => {
  state.loading = true
  try {
    const data = await getSales()
    state.data = prepareDataSales(data)
  } catch (e) {
    console.error(e)
  } finally {
    state.loading = false
  }
})
</script>
