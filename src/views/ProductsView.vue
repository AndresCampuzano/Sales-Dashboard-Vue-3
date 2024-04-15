<template>
  <floating-buttons :menu="state.menu" />
  <main>
    <section class="max-w-lg m-auto px-3">
      <h1 class="text-2xl">Broches</h1>
      <loading-sales-item-skeleton v-if="state.loading" />
      <ul v-else>
        <product-item v-for="item in state.products" :key="item._id" :data="item" />
      </ul>
    </section>
  </main>
</template>

<script lang="ts" setup>
import { onBeforeMount, reactive } from 'vue'
import FloatingButtons, { type Menu } from '@/components/FloatingButtons.vue'
import { toast } from 'vue3-toastify'
import { getItems } from '@/services/item.service.ts'
import type { Item } from '@/types/types.ts'
import LoadingSalesItemSkeleton from '@/components/LoadingSalesItemSkeleton.vue'
import ProductItem from '@/components/ProductItem.vue'

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
      label: 'nuevo broche',
      to: '/products/new',
      forward: true
    },
    {
      label: 'clientes',
      to: '/customers'
    }
  ] as Menu[],
  products: [] as Item[]
})

onBeforeMount(async () => {
  try {
    await fetchData()
  } catch (e) {
    toast.error('Error al obtener la información. ' + e)
  } finally {
    state.loading = false
  }
})

async function fetchData() {
  state.products = await getItems()
}
</script>
