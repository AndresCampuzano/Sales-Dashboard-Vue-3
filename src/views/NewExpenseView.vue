<template>
  <floating-buttons :menu="state.menu" />
  <main>
    <section class="max-w-lg m-auto px-3">
      <h1 class="text-2xl">Nuevo Gasto</h1>
      <form class="m-6" @submit.prevent="onSubmit">
        <form-radio
          v-model="state.form.expenseType"
          value="instagram"
          id="instagram-radio"
          name="expense-type"
          label="Anuncio de Instagram"
        />
        <form-radio
          v-model="state.form.expenseType"
          value="facebook"
          id="facebook-radio"
          name="expense-type"
          label="Anuncio de Facebook"
        />
        <form-radio
          v-model="state.form.expenseType"
          value="other"
          id="other-radio"
          name="expense-type"
          label="Otro"
        />
        <form-select
          v-model="state.form.currency"
          :select-options="state.form.currencyOptions"
          id="currency-select"
          label="Divisa"
        />
        <FormButton text="Guardar" type="submit" />
      </form>
    </section>
  </main>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import FloatingButtons, { type Menu } from '@/components/FloatingButtons.vue'
import FormRadio from '@/components/form-inputs/FormRadio.vue'
import FormButton from '@/components/form-inputs/FormButton.vue'
import FormSelect, { type SelectOptions } from '@/components/form-inputs/FormSelect.vue'
import { CURRENCIES } from '@/constants/constants.ts'

const state = reactive({
  loading: true,
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
  form: {
    expenseType: '',
    currency: '',
    currencyOptions: CURRENCIES.map((x) => ({ label: x.value, value: x.value })) as SelectOptions[]
  }
})

async function onSubmit() {
  console.log(state.form)
}
</script>
