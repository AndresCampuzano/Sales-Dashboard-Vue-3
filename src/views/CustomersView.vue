<template>
  <floating-buttons :menu="state.menu" />
  <main>
    <section class="max-w-lg m-auto px-3">
      <h1 class="text-2xl">Clientes</h1>
      <loading-sales-item-skeleton v-if="state.loading" />
      <template v-else>
        <form-input
          v-model="state.query"
          id="query"
          placeholder="Buscar cliente por nombre"
          class="mt-3"
        />
        <p v-if="state.query.trim()" @click="clearQuery" class="text-base underline mt-2 mb-3">
          Limpiar
        </p>
        <ul>
          <customer-item v-for="item in filteredCustomer" :key="item._id" :data="item" />
        </ul>
      </template>
    </section>
  </main>
</template>

<script lang="ts" setup>
import { computed, onBeforeMount, reactive } from 'vue'
import FloatingButtons, { type Menu } from '@/components/FloatingButtons.vue'
import { toast } from 'vue3-toastify'
import type { Customer } from '@/types/types.ts'
import LoadingSalesItemSkeleton from '@/components/LoadingSalesItemSkeleton.vue'
import FormInput from '@/components/form-inputs/FormInput.vue'
import { normalizeString } from '@/utils/strings.ts'
import { getCustomers } from '@/services/customer.service.ts'
import CustomerItem from '@/components/CustomerItem.vue'

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
      label: 'nuevo cliente',
      to: '/customers/new',
      forward: true
    }
  ] as Menu[],
  customers: [] as Customer[],
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
  state.customers = (await getCustomers()).reverse()
}

const filteredCustomer = computed<Customer[]>(() => {
  if (state.query) {
    return state.customers.filter((customer) => {
      return normalizeString(customer.name.toLowerCase()).includes(
        normalizeString(state.query.toLowerCase().trim())
      )
    })
  }
  return state.customers
})

function clearQuery() {
  state.query = ''
}
</script>
