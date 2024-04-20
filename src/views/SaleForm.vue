<template>
  <floating-buttons :menu="state.menu" />
  <main>
    <section class="max-w-lg m-auto px-3">
      <h1 v-if="state.editing" class="text-2xl">Editar Venta</h1>
      <h1 v-else class="text-2xl">Nueva Venta</h1>
      <loading-form-skeleton v-if="state.loading" />
      <form v-else class="mx-6 mt-6 mb-24" @submit.prevent="onSubmit">
        <form-input
          v-model="state.queryCustomer"
          id="query_customer"
          type="text"
          placeholder="Buscar cliente por nombre, ciudad, dept, instagram"
          :disabled="state.lockUI"
        />
        <ul class="max-h-60 overflow-y-auto bg-gray-700 p-2 rounded-md">
          <template v-if="searchedCustomers.length > 0">
            <customer-item
              v-for="item in sortByCreatedAt(searchedCustomers)"
              :key="item._id"
              @click="onSelectCustomer(item._id)"
              :data="item"
              preview-mode
              class="cursor-pointer hover:opacity-80"
            />
          </template>
          <template v-else>
            <p class="text-base">No se encuentra el cliente, intenta con otro parámetro</p>
          </template>
        </ul>
        <div v-if="state.selectedCustomer === null" class="bg-gray-700 p-2 rounded-md mt-4">
          <p class="text-base">Selecciona un cliente</p>
        </div>
        <template v-else>
          <div class="bg-green-800 p-2 rounded-md mt-4">
            <customer-item :data="state.selectedCustomer" />
          </div>
          <p
            v-if="state.selectedCustomer"
            @click="onClearSelectedCustomer"
            class="text-base underline mt-2 mb-3 cursor-pointer"
          >
            Limpiar
          </p>
        </template>
        <hr class="border-slate-700 my-8" />
        <form-input
          v-model="state.queryProduct"
          id="query_product"
          type="text"
          placeholder="Buscar broche por nombre"
          :disabled="state.lockUI"
        />
        <ul class="max-h-60 overflow-y-auto bg-gray-700 p-2 rounded-md">
          <template v-if="searchedProducts.length > 0">
            <product-item
              v-for="item in sortByCreatedAt(searchedProducts)"
              :key="item._id"
              @click="onSelectProduct(item._id)"
              :data="item"
              preview-mode
              class="cursor-pointer hover:opacity-80"
            />
          </template>
          <template v-else>
            <p class="text-base">No se encuentra el broche, intenta con otro nombre</p>
          </template>
        </ul>
        <div v-if="state.selectedProduct === null" class="bg-gray-700 p-2 rounded-md mt-4">
          <p class="text-base">Selecciona un broche</p>
        </div>
        <template v-else>
          <div class="bg-green-800 p-2 rounded-md mt-4">
            <product-item :data="state.selectedProduct" />
            <div class="mb-6">
              <p class="block mb-2 font-medium">Colores disponibles del broche</p>
              <div
                class="w-full flex flex-wrap border rounded-lg p-2.5 bg-gray-800 border-gray-600"
              >
                <colored-badge
                  v-for="item in unselectedBadges"
                  :key="item.label"
                  @click="addColor(item.label)"
                  :label="item.label"
                  :color="item.label"
                  class="m-1 cursor-pointer"
                />
              </div>
              <p class="block font-medium mt-4 mb-2">Color seleccionado</p>
              <div class="bg-gray-800 p-2 rounded-md">
                <colored-badge
                  v-if="state.form.items.color"
                  @click="deleteColor(state.form.items.color)"
                  :label="state.form.items.color"
                  :color="state.form.items.color"
                  class="m-1 cursor-pointer"
                />
                <p v-else class="text-base">
                  Selecciona un color <span class="text-red-600">*</span>
                </p>
              </div>
              <form-input
                v-model="state.form.items.price"
                id="price"
                type="number"
                label="Precio del broche"
                :disabled="state.lockUI"
                required
              />
            </div>
          </div>
          <p
            v-if="state.selectedProduct"
            @click="onClearSelectedProduct"
            class="text-base underline mt-2 mb-3 cursor-pointer"
          >
            Limpiar
          </p>
        </template>
        <hr class="border-slate-700 my-4" />
      </form>
    </section>
  </main>
</template>

<script lang="ts" setup>
import FloatingButtons, { type Menu } from '@/components/FloatingButtons.vue'
import { computed, onBeforeMount, reactive } from 'vue'
import LoadingFormSkeleton from '@/components/LoadingFormSkeleton.vue'
import FormInput from '@/components/form-inputs/FormInput.vue'
import type { Customer, Product } from '@/types/types.ts'
import { getCustomers } from '@/services/customer.service.ts'
import { getItems } from '@/services/item.service.ts'
import { toast } from 'vue3-toastify'
import { normalizeString } from '@/utils/strings.ts'
import { sortByCreatedAt } from '@/utils/dates.ts'
import CustomerItem from '@/components/CustomerItem.vue'
import ProductItem from '@/components/ProductItem.vue'
import ColoredBadge from '@/components/ColoredBadge.vue'
import { COLORS } from '@/constants/constants.ts'

interface SelectedProduct extends Product {
  index: string
}

const state = reactive({
  loading: true,
  editing: false,
  lockUI: false,
  menu: [
    {
      label: 'ventas',
      to: '/',
      active: true
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
  ] as Menu[],
  form: {
    client_id: '',
    client_snapshot: '',
    // items: [] as Sale['items']
    items: {
      item_id: '',
      color: '',
      price: 0
    }
  },
  queryCustomer: '',
  queryProduct: '',
  customers: [] as Customer[],
  products: [] as Product[],
  selectedCustomer: null as Customer | null,
  selectedProduct: null as Product | null,
  selectedProducts: [] as SelectedProduct[],
  modal: false
})

onBeforeMount(async () => {
  try {
    await fetchAndLoadData()
  } catch (e) {
    toast.error('Error al obtener la información. ' + e)
  } finally {
    state.loading = false
  }
})

const searchedCustomers = computed(() => {
  if (state.queryCustomer) {
    return state.customers.filter((customer) => {
      const query = normalizeString(state.queryCustomer.toLowerCase().trim())

      const byName = normalizeString(customer.name.toLowerCase()).includes(query)
      const byCity = normalizeString(customer.city.toLowerCase()).includes(query)
      const byDepartment = normalizeString(customer.department.toLowerCase()).includes(query)
      const byInstagram = normalizeString(customer.instagram_account.toLowerCase()).includes(query)
      return byName || byCity || byDepartment || byInstagram
    })
  }
  return state.customers
})

const searchedProducts = computed(() => {
  if (state.queryProduct) {
    return state.products.filter((customer) => {
      const query = normalizeString(state.queryProduct.toLowerCase().trim())

      return normalizeString(customer.name.toLowerCase()).includes(query)
    })
  }
  return state.products
})

const unselectedBadges = computed(() => {
  return COLORS.filter((item: any) => state.selectedProduct?.available_colors.includes(item.label))
})

async function fetchAndLoadData() {
  state.customers = await getCustomers()
  state.products = await getItems()
}

async function onSubmit() {
  console.log(state.form)
}

function onSelectCustomer(id: string) {
  if (state.selectedCustomer?._id === id) return
  state.selectedCustomer = state.customers.find((x) => x._id === id) || null
}

function onSelectProduct(id: string) {
  if (state.selectedProduct?._id === id) return
  const product = state.products.find((x) => x._id === id) || null
  state.selectedProduct = product
  state.form.items.price = product?.price || 0
}

function onClearSelectedCustomer() {
  state.selectedCustomer = null
}

function onClearSelectedProduct() {
  state.selectedProduct = null
  state.form.items = {
    item_id: '',
    color: '',
    price: 0
  }
}

function addColor(label: string) {
  state.form.items.color = label
}

function deleteColor(label: string) {
  state.form.items.color = ''
}
</script>
