<template>
  <floating-buttons :menu="state.menu" />
  <main>
    <section class="max-w-lg m-auto px-3">
      <h1 v-if="state.editing" class="text-2xl">Editar Venta</h1>
      <h1 v-else class="text-2xl">Nueva Venta</h1>
      <loading-form-skeleton v-if="state.loading" />
      <form v-else class="mx-6 mt-6 mb-24" @keydown.enter="$event.preventDefault()" @submit.prevent>
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
          <p class="text-base">Selecciona un cliente <span class="text-red-600">*</span></p>
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
              @click="onAddProductToStack(item._id)"
              :data="item"
              preview-mode
              class="cursor-pointer hover:opacity-80"
            />
          </template>
          <template v-else>
            <p class="text-base">No se encuentra el broche, intenta con otro nombre</p>
          </template>
        </ul>
        <div v-if="!state.productsStack.length" class="bg-gray-700 p-2 rounded-md mt-4">
          <p class="text-base">Selecciona un broche <span class="text-red-600">*</span></p>
        </div>
        <template v-else>
          <template v-for="product in state.productsStack" :key="product.index">
            <div class="bg-green-800 p-2 rounded-md mt-4">
              <product-item :data="product" preview-mode />
              <div class="mb-6">
                <p class="block mb-2 font-medium">Colores disponibles del broche</p>
                <div
                  class="w-full flex flex-wrap border rounded-lg p-2.5 bg-gray-800 border-gray-600"
                >
                  <colored-badge
                    v-for="color in product.available_colors"
                    :key="color"
                    @click="addColor(product.index, color)"
                    :label="color"
                    :color="color"
                    class="m-1 cursor-pointer"
                  />
                </div>
                <p class="block font-medium mt-4 mb-2">Color seleccionado</p>
                <div class="bg-gray-800 p-2 rounded-md">
                  <colored-badge
                    v-if="product.selectedColor"
                    @click="deleteColor(product.index)"
                    :label="product.selectedColor"
                    :color="product.selectedColor"
                    class="m-1 cursor-pointer"
                  />
                  <p v-else class="text-base">
                    Selecciona un color <span class="text-red-600">*</span>
                  </p>
                </div>
                <form-input
                  v-model="product.selectedPrice"
                  :id="`price-${product.index}`"
                  type="number"
                  :label="`Precio del ${product.name}`"
                  :disabled="state.lockUI"
                  class="mt-4"
                  required
                />
              </div>
            </div>
            <p
              @click="onClearProductFromStack(product.index)"
              class="text-base underline mt-2 mb-3 cursor-pointer"
            >
              Limpiar
            </p>
          </template>
        </template>
        <hr class="border-slate-700 my-4" />
        <form-button
          @click="onOpenModal"
          text="Guardar"
          :disabled="!isFormFilledUp.success || state.lockUI"
          style-type="primary"
          type="button"
        />
      </form>
    </section>
  </main>
  <custom-modal
    v-if="state.modal"
    title="Confirmar Venta"
    description="Lo siguientes elementos serán guardados:"
    primary-button="Guardar"
    secondary-button="Cancelar"
    is-danger
    @close="onCloseModal"
    @submit="onSubmit"
  >
    <ul>
      <li
        v-for="item in state.productsStack"
        :key="item.index"
        class="p-2 bg-gray-700 rounded-md my-3 list-none flex items-center text-left"
      >
        <img
          :src="recoverProductForModal(item._id as string).image"
          :alt="recoverProductForModal(item._id as string).name"
          class="rounded-full h-10 w-14 object-cover"
        />
        <div class="ml-3 flex w-full">
          <p class="text-base">
            {{ recoverProductForModal(item._id as string).name }}
            <colored-badge :label="item.selectedColor" :color="item.selectedColor" />
          </p>
          <p class="ml-auto mr-2">{{ currencyFormat(item.selectedPrice) }}</p>
        </div>
      </li>
    </ul>
    <div class="w-fit ml-auto mr-2.5 flex">
      <span
        class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
        >Ganancias</span
      >
      <div class="flex flex-col">
        <p class="ml-3 text-green-400 text-base">
          {{ currencyFormat(earnings) }}
        </p>
      </div>
    </div>
    <hr class="border-slate-700 my-8" />
    <p class="text-base text-left">Para el cliente:</p>
    <div>
      <customer-item :data="state.selectedCustomer as Customer" hide-icon class="text-left" />
    </div>
  </custom-modal>
</template>

<script lang="ts" setup>
import FloatingButtons, { type Menu } from '@/components/FloatingButtons.vue'
import { computed, onBeforeMount, reactive } from 'vue'
import { toast } from 'vue3-toastify'
import appRouter from '@/router'
import LoadingFormSkeleton from '@/components/LoadingFormSkeleton.vue'
import FormInput from '@/components/form-inputs/FormInput.vue'
import type { Customer, Product, Sale } from '@/types/types.ts'
import { getCustomers } from '@/services/customer.service.ts'
import { getItems } from '@/services/item.service.ts'
import { normalizeString } from '@/utils/strings.ts'
import { sortByCreatedAt } from '@/utils/dates.ts'
import CustomerItem from '@/components/CustomerItem.vue'
import ProductItem from '@/components/ProductItem.vue'
import ColoredBadge from '@/components/ColoredBadge.vue'
import FormButton from '@/components/form-inputs/FormButton.vue'
import { postSale } from '@/services/sale.service.ts'
import CustomModal from '@/components/CustomModal.vue'
import { currencyFormat } from '@/utils/currencyFormat.ts'

interface ProductsStack extends Product {
  index: string
  selectedColor: string
  selectedPrice: number
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
  ] as Menu[],
  queryCustomer: '',
  queryProduct: '',
  customers: [] as Customer[],
  products: [] as Product[],
  selectedCustomer: null as Customer | null,
  selectedProduct: null as Product | null,
  productsStack: [] as ProductsStack[],
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

async function fetchAndLoadData() {
  state.customers = await getCustomers()
  state.products = await getItems()
}

const earnings = computed<number>(() => {
  return isFormFilledUp.value.data.items.reduce(
    (accumulator: any, currentValue: any) => accumulator + currentValue.price,
    0
  )
})

/**
 * validates all inputs and actions are filled up/completed
 * @returns {boolean} success
 * @returns {object} data
 */
const isFormFilledUp = computed<{
  success: boolean
  data: Record<string, any>
}>(() => {
  const client_id = state.selectedCustomer?._id as string
  const items = state.productsStack.map((x) => ({
    item_id: x._id,
    color: x.selectedColor,
    price: Number(x.selectedPrice)
  }))
  return {
    success:
      client_id?.length > 0 &&
      items.length > 0 &&
      items.every((x) => x.item_id !== undefined && x.item_id?.length > 0) &&
      items.every((x) => x.color?.length > 0) &&
      items.every((x) => x.price > 0),
    data: {
      client_id,
      items
    }
  }
})

async function onSubmit() {
  const { success, data } = isFormFilledUp.value
  if (!success) {
    toast.warning('Revisa los datos e intentalo nuevamente. ')
    return
  }
  try {
    await postSale(data as Sale)
    toast.success('Datos guardados!')
    state.lockUI = true
    goBack()
  } catch (e) {
    toast.error('Revisa los datos e intentalo nuevamente. ' + e)
    state.lockUI = false
  }
}

// Go back one step in history
function goBack() {
  setTimeout(() => {
    appRouter.push('/')
  }, 3000)
}

function onSelectCustomer(id: string) {
  if (state.selectedCustomer?._id === id) return
  state.selectedCustomer = state.customers.find((x) => x._id === id) || null
}

function onAddProductToStack(id: string) {
  const product = state.products.find((x) => x._id === id) as Product
  const index = Math.random().toString(16)
  state.productsStack = [
    ...state.productsStack,
    {
      index,
      selectedColor: '',
      selectedPrice: product.price,
      ...product
    }
  ]
}

function onClearSelectedCustomer() {
  state.selectedCustomer = null
}

function onClearProductFromStack(index: string) {
  state.productsStack = state.productsStack.filter((x) => x.index !== index)
}

function addColor(index: string, color: string) {
  const product = state.productsStack.find((x) => x.index === index)
  if (!product) return
  product.selectedColor = color
}

function deleteColor(index: string) {
  const product = state.productsStack.find((x) => x.index === index)
  if (!product) return
  product.selectedColor = ''
}

function onOpenModal() {
  state.modal = true
}

function onCloseModal() {
  state.modal = false
}

/**
 * Recovers the product's image and name
 * @param _id
 */
function recoverProductForModal(_id: string): {
  image: string
  name: string
} {
  const product = state.products.find((x) => x._id === _id) as Product
  return {
    image: product.image,
    name: product.name
  }
}
</script>
