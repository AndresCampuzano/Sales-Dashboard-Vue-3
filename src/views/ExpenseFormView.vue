<template>
  <floating-buttons :menu="state.menu" />
  <main>
    <section class="max-w-lg m-auto px-3">
      <h1 v-if="state.editing" class="text-2xl">Editar Gasto</h1>
      <h1 v-else class="text-2xl">Nuevo Gasto</h1>
      <loading-form-skeleton v-if="state.loading" />
      <form v-else class="mx-6 mt-6 mb-24" @submit.prevent="onSubmit">
        <form-radio
          v-model="state.form.type"
          value="instagram_ad"
          id="instagram-radio"
          name="expense-type"
          label="Anuncio de Instagram"
        />
        <form-radio
          v-model="state.form.type"
          value="facebook_ad"
          id="facebook-radio"
          name="expense-type"
          label="Anuncio de Facebook"
        />
        <form-radio
          v-model="state.form.type"
          value="other"
          id="other-radio"
          name="expense-type"
          label="Otro"
        />
        <form-input
          v-if="state.form.type === 'other'"
          v-model="state.form.name"
          id="name"
          type="text"
          label="Tipo del gasto"
          placeholder="ej. Hilos"
        />
        <form-select
          v-model="state.form.currency"
          :select-options="state.formPreloadedData.currencyOptions"
          id="currency-select"
          label="Divisa"
          placeholder="Selecciona una divisa"
        />
        <form-input v-model="state.form.price" id="price" type="text" label="Valor" required />
        <form-input
          v-model="state.form.description"
          id="description"
          type="text"
          label="Descripción (opcional)"
          placeholder="Descripción"
        />
        <FormButton
          :text="state.editing ? 'Editar' : 'Guardar'"
          type="submit"
          :disabled="!isFormFilledUp"
        />
        <FormButton
          v-if="state.editing"
          @click="onDelete"
          text="Eliminar"
          type="button"
          style-type="danger"
        />
      </form>
    </section>
  </main>
</template>

<script lang="ts" setup>
import { onBeforeMount, reactive, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { toast } from 'vue3-toastify'
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

const router = useRoute()
const expenseId = router.params.id as string

const state = reactive({
  loading: true,
  editing: false,
  menu: [
    {
      label: 'ventas',
      to: '/'
    },
    {
      label: 'gastos',
      to: '/expenses',
      back: true
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
  }
})

onBeforeMount(async () => {
  if (expenseId) {
    state.editing = true
    try {
      await fetchData()
    } catch (e) {
      toast.error('Error al obtener información. ' + e)
    } finally {
      state.loading = false
    }
  } else {
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

async function fetchData() {
  const data = await getExpense(expenseId)
  state.form.name = data.name
  state.form.currency = data.currency || CURRENCIES[0].value
  state.form.price = data.price
  state.form.description = data.description || ''
  state.form.type = data.type
}

const isFormFilledUp = computed(() => {
  const { name, type, price } = state.form
  return type.trim().length > 0 && type === 'other' ? name.trim().length > 0 : price > 0
})

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
  } catch (e) {
    toast.error('Revisa los datos e intentalo nuevamente. ' + e)
  }
}

async function onDelete() {
  try {
    await deleteExpense(expenseId)
    toast.warning('Datos borrados')
  } catch (e) {
    toast.error('Revisa los datos e intentalo nuevamente. ' + e)
  }
}
</script>
