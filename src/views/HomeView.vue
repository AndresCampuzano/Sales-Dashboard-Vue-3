<template>
  <floating-buttons :menu="state.menu" />
  <main>
    <section class="max-w-lg m-auto px-3">
      <h1 class="text-2xl">Ventas</h1>
      <template v-if="state.loading">
        <loading-sales-item-skeleton :show-circle="true" />
      </template>
      <summary-item v-for="item in state.data" :key="item._id" :data="item" />
    </section>
  </main>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import type { SummarySale } from '@/types/types.ts'
import { getSales } from '@/services/sale.service.ts'
import { prepareDataSales } from '@/utils/prepareDataSales.ts'
import SummaryItem from '@/components/SummaryItem.vue'
import FloatingButtons, { type Menu } from '@/components/FloatingButtons.vue'
import LoadingSalesItemSkeleton from '@/components/LoadingSalesItemSkeleton.vue'

const state = reactive({
  loading: true,
  data: [] as SummarySale[],
  menu: [
    {
      label: 'nueva venta',
      to: '/sales/new',
      active: true
    },
    {
      label: 'gastos y rendimientos',
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
