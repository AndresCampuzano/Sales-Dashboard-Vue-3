<template>
  <floating-buttons :menu="state.menu" />
  <main>
    <section class="max-w-lg m-auto px-3">
      <h1 v-if="state.editing" class="text-2xl">Editar Gasto</h1>
      <h1 v-else class="text-2xl">Nuevo Gasto</h1>
      <loading-form-skeleton v-if="state.loading" />
      <form v-else class="mx-6 mt-6 mb-24" @keydown.enter="$event.preventDefault()" @submit.prevent>
        <form-radio
          v-model="state.form.type"
          value="instagram_ad"
          id="instagram-radio"
          name="expense-type"
          label="Anuncio de Instagram"
          :disabled="state.lockUI"
        />
        <form-radio
          v-model="state.form.type"
          value="facebook_ad"
          id="facebook-radio"
          name="expense-type"
          label="Anuncio de Facebook"
          :disabled="state.lockUI"
        />
        <form-radio
          v-model="state.form.type"
          value="other"
          id="other-radio"
          name="expense-type"
          label="Otro"
          :disabled="state.lockUI"
        />
        <form-input
          v-if="state.form.type === 'other'"
          v-model="state.form.name"
          id="name"
          type="text"
          label="Tipo del gasto"
          placeholder="ej. Hilos"
          :disabled="state.lockUI"
        />
        <form-select
          v-model="state.form.currency"
          :select-options="state.formPreloadedData.currencyOptions"
          id="currency-select"
          label="Divisa del gasto"
          placeholder="Selecciona una divisa"
          :disabled="state.lockUI"
          required
        />
        <form-input
          v-model="state.form.price"
          id="price"
          type="text"
          label="Valor del gasto"
          required
          :disabled="state.lockUI"
        />
        <form-input
          v-model="state.form.description"
          id="description del gasto"
          type="text"
          label="Descripción (opcional)"
          placeholder="Descripción"
          :disabled="state.lockUI"
        />
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
    title="Eliminar gasto"
    description="¿Deseas eliminar el gasto?"
    primary-button="Eliminar"
    secondary-button="Cancelar"
    is-danger
    @close="onCloseModal"
    @submit="onDelete"
  />
</template>

<script lang="ts" setup>
import { onBeforeMount, reactive, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { toast } from 'vue3-toastify'
import appRouter from '@/router'
import FloatingButtons, { type Menu } from '@/components/FloatingButtons.vue'
import FormRadio from '@/components/form-inputs/FormRadio.vue'
import FormButton from '@/components/form-inputs/FormButton.vue'
import FormSelect, { type SelectOptions } from '@/components/form-inputs/FormSelect.vue'
import { CURRENCIES, EXPENSES_TYPES } from '@/constants/constants.ts'
import FormInput from '@/components/form-inputs/FormInput.vue'
import type { ExpenseInterface } from '@/types/types.ts'
import {
  deleteExpense,
  getExpense,
  postExpense,
  updateExpense
} from '@/services/expense.service.ts'
import LoadingFormSkeleton from '@/components/LoadingFormSkeleton.vue'
import CustomModal from '@/components/CustomModal.vue'

const router = useRoute()
const expenseId = router.params.id as string

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
      to: '/expenses',
      active: true
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
  formPreloadedData: {
    currencyOptions: CURRENCIES.map((x) => ({ label: x.value, value: x.value })) as SelectOptions[]
  },
  form: {
    type: '',
    name: '',
    currency: '',
    price: 0,
    description: ''
  },
  modal: false
})

onBeforeMount(async () => {
  if (expenseId) {
    state.editing = true
    try {
      await fetchAndLoadData()
    } catch (e) {
      toast.error('Error al obtener la información. ' + e)
    } finally {
      state.loading = false
    }
  } else {
    state.form.type = EXPENSES_TYPES[0].value
    state.form.currency = CURRENCIES[0].value
    state.form.price = 23800
    state.loading = false
  }
})

// Sets the price to 0 if the input is empty
watch(
  () => state.form.price,
  (value: any) => {
    // string | number
    if (typeof value === 'string') {
      state.form.price = Number(value)
    } else if (value === '' || isNaN(value)) {
      state.form.price = 0
    }
  }
)

const isFormFilledUp = computed(() => {
  const { name, type, price } = state.form
  return type.trim().length > 0 && type === 'other' ? name.trim().length > 0 : price > 0
})

async function fetchAndLoadData() {
  const { name, currency, price, description, type } = await getExpense(expenseId)
  state.form.name = name
  state.form.currency = currency || CURRENCIES[0].value
  state.form.price = price
  state.form.description = description || ''
  state.form.type = type
}

async function onSubmit() {
  const { currency, name, type, description, price } = state.form
  if (!isFormFilledUp.value) return
  const data: ExpenseInterface = {
    name:
      type === 'other' ? name : (EXPENSES_TYPES.find((exp) => exp.value === type)?.label as string),
    type,
    price,
    description,
    currency
  }

  try {
    if (state.editing) {
      await updateExpense(expenseId, data)
    } else {
      await postExpense(data)
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
    await deleteExpense(expenseId)
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
