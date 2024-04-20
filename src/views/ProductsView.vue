<template>
  <floating-buttons :menu="state.menu" />
  <main>
    <section class="max-w-lg m-auto px-3">
      <h1 class="text-2xl">Broches</h1>
      <loading-sales-item-skeleton v-if="state.loading" />
      <template v-else>
        <form-input
          v-model="state.query"
          id="query"
          placeholder="Buscar broche por nombre"
          class="mt-3"
        />
        <p
          v-if="state.query.trim()"
          @click="clearQuery"
          class="text-base underline mt-2 mb-3 cursor-pointer"
        >
          Limpiar
        </p>
        <ul>
          <product-item v-for="item in filteredProducts" :key="item._id" :data="item" />
        </ul>
      </template>
    </section>
  </main>
</template>

<script lang="ts" setup>
import { computed, onBeforeMount, reactive } from 'vue'
import FloatingButtons, { type Menu } from '@/components/FloatingButtons.vue'
import { toast } from 'vue3-toastify'
import { getItems } from '@/services/item.service.ts'
import type { Product } from '@/types/types.ts'
import LoadingSalesItemSkeleton from '@/components/LoadingSalesItemSkeleton.vue'
import ProductItem from '@/components/ProductItem.vue'
import FormInput from '@/components/form-inputs/FormInput.vue'
import { normalizeString } from '@/utils/strings.ts'

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
      active: true
    },
    {
      label: 'clientes',
      to: '/customers'
    }
  ] as Menu[],
  products: [] as Product[],
  query: ''
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
  state.products = (await getItems()).reverse()
}

const filteredProducts = computed<Product[]>(() => {
  if (state.query) {
    return state.products.filter((product) => {
      return normalizeString(product.name.toLowerCase()).includes(
        normalizeString(state.query.toLowerCase().trim())
      )
    })
  }
  return state.products
})

function clearQuery() {
  state.query = ''
}
</script>
