<template>
  <floating-buttons :menu="state.menu" />
  <main>
    <section class="max-w-lg m-auto px-3">
      <h1 v-if="state.editing" class="text-2xl">Editar Cliente</h1>
      <h1 v-else class="text-2xl">Nuevo Cliente</h1>
      <loading-form-skeleton v-if="state.loading" />
      <form v-else class="mx-6 mt-6 mb-24" @keydown.enter="$event.preventDefault()" @submit.prevent>
        <form-input
          v-model="state.form.name"
          id="name"
          type="text"
          label="Nombre del cliente"
          placeholder="Nombre del cliente"
          :disabled="state.lockUI"
          required
        />
        <form-input
          v-model="state.form.instagram_account"
          id="instagram"
          type="text"
          label="Cuenta de instagram"
          placeholder="Cuenta de instagram"
          :disabled="state.lockUI"
          required
        />
        <form-input
          v-model="state.form.address"
          id="address"
          type="text"
          label="Dirección del cliente"
          placeholder="Dirección del cliente"
          :disabled="state.lockUI"
          required
        />
        <form-select
          v-model="state.form.department"
          :select-options="departmentOptions"
          label="Departamento"
          placeholder="Elige el departamento"
          id="department"
          required
          :disabled="state.lockUI"
        />
        <form-select
          v-model="state.form.city"
          :select-options="cityOptions"
          label="Ciudad"
          placeholder="Elige la ciudad"
          id="city"
          required
          :disabled="state.lockUI"
        />
        <form-input
          v-model="state.form.phone"
          id="price"
          type="number"
          label="Teléfono del cliente"
          :disabled="state.lockUI"
          required
        />
        <form-input
          v-model="state.form.cc"
          id="cc"
          type="text"
          label="Identificación (opcional)"
          :disabled="state.lockUI"
        />
        <form-input
          v-model="state.form.comments"
          id="price"
          type="text"
          label="Comentarios extras (opcional)"
          :disabled="state.lockUI"
        />
        <span
          v-if="!state.hasSnapshotsOnSales && state.editing"
          class="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-base text-red-700 ring-1 ring-inset ring-red-600/10 mb-6"
          >Precaución:
          <br />
          En caso de que este cliente tenga ventas, editar este cliente puede también
          accidentalmente editar la información del cliente en pasadas ventas.</span
        >
        <form-button
          @click="onSubmit"
          :text="state.editing ? 'Editar' : 'Guardar'"
          :disabled="!isFormFilledUp || state.lockUI"
          style-type="primary"
          type="button"
        />
        <form-button
          v-if="state.editing"
          @click="onOpenModal"
          :disabled="state.lockUI"
          style-type="danger"
          text="Eliminar"
          type="button"
        />
      </form>
    </section>
  </main>
  <custom-modal
    v-if="state.modal"
    title="Eliminar cliente"
    :description="`¿Deseas eliminar el cliente ${state.form.name}?`"
    primary-button="Eliminar"
    secondary-button="Cancelar"
    is-danger
    @close="onCloseModal"
    @submit="onDelete"
  />
</template>

<script lang="ts" setup>
import { computed, onBeforeMount, reactive, watch } from 'vue'
import { toast } from 'vue3-toastify'
import { useRoute } from 'vue-router'
import appRouter from '@/router'
import type { Customer } from '@/types/types.ts'
import FloatingButtons, { type Menu } from '@/components/FloatingButtons.vue'
import LoadingFormSkeleton from '@/components/LoadingFormSkeleton.vue'
import FormButton from '@/components/form-inputs/FormButton.vue'
import FormInput from '@/components/form-inputs/FormInput.vue'
import CustomModal from '@/components/CustomModal.vue'
import {
  deleteCustomer,
  getCustomer,
  postCustomer,
  updateCustomer
} from '@/services/customer.service.ts'
import FormSelect from '@/components/form-inputs/FormSelect.vue'
import { CO_PLACES } from '@/constants/constants.ts'

const router = useRoute()
const productId = router.params.id as string

const state = reactive({
  loading: true,
  editing: false,
  lockUI: false,
  menu: [
    {
      label: 'ventas',
      to: '/'
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
      to: '/customers',
      active: true
    }
  ] as Menu[],
  form: {
    name: '',
    address: '',
    city: '',
    department: '',
    instagram_account: '',
    phone: 0,
    cc: '',
    comments: ''
  },
  hasSnapshotsOnSales: false,
  modal: false
})

onBeforeMount(async () => {
  if (productId) {
    state.editing = true
    try {
      await fetchAndLoadData()
    } catch (e) {
      toast.error('Error al obtener la información. ' + e)
    } finally {
      state.loading = false
    }
  } else {
    state.loading = false
  }
})

// Sets the phone to 0 if the input is empty or invalid
watch(
  () => state.form.phone,
  (value: any) => {
    // string | number
    if (typeof value === 'string') {
      state.form.phone = Number(value)
    } else if (value === '' || isNaN(value)) {
      state.form.phone = 0
    }
  }
)

const isFormFilledUp = computed<boolean>(() => {
  const { name, city, department, instagram_account, phone, address } = state.form
  return (
    name.trim().length > 0 &&
    city.trim().length > 0 &&
    department.trim().length > 0 &&
    instagram_account.trim().length > 0 &&
    phone > 0 &&
    address.trim().length > 0
  )
})

const departmentOptions = computed(() => {
  return CO_PLACES.map((x) => ({
    label: x.department,
    value: x.department
  }))
})

const cityOptions = computed(() => {
  if (!state.form.department) return []
  const res = CO_PLACES.find((x) => x.department === state.form.department)
  const cities = res?.cities.map((x) => ({
    label: x,
    value: x
  }))
  return cities || []
})

async function fetchAndLoadData() {
  const {
    name,
    city,
    department,
    instagram_account,
    phone,
    address,
    cc,
    comments,
    has_snapshots_on_sales
  } = await getCustomer(productId)
  state.form.name = name
  state.form.city = city
  state.form.department = department
  state.form.address = address
  state.form.phone = phone
  state.form.cc = cc || ''
  state.form.comments = comments || ''
  state.form.instagram_account = instagram_account
  state.hasSnapshotsOnSales = !!has_snapshots_on_sales
}

async function onSubmit() {
  const { name, city, department, instagram_account, phone, address, cc, comments } = state.form

  if (!isFormFilledUp.value) return

  const data: Customer = {
    name,
    city,
    department,
    instagram_account,
    phone,
    address,
    cc,
    comments
  }

  try {
    if (state.editing) {
      await updateCustomer(productId, data)
    } else {
      await postCustomer(data)
    }
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
    const pathToGoBack = router.fullPath.split('/')[1]
    appRouter.push('/' + pathToGoBack)
  }, 3000)
}

async function onDelete() {
  try {
    await deleteCustomer(productId)
    toast.warning('Datos borrados')
    state.lockUI = true
    goBack()
  } catch (e) {
    toast.error('Revisa los datos e intentalo nuevamente. ' + e)
    state.lockUI = false
  }
}

function onOpenModal() {
  state.modal = true
}

function onCloseModal() {
  state.modal = false
}
</script>
