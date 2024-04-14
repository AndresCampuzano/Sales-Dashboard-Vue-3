<template>
  <li class="my-3 p-2.5 bg-gray-800 rounded-md list-none">
    <p class="mb-2 text-base">{{ localizeMonthInUI(data.month) }}</p>
    <div>
      <div v-if="data.sortedExpenses.length" class="flex">
        <span
          class="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20"
          >Gastos</span
        >
        <div class="flex flex-col">
          <p
            v-for="item in data.sortedExpenses"
            :key="item.currencyKey"
            class="ml-2 text-yellow-400 text-base"
          >
            {{
              currencyFormat(
                item.items.reduce((a, b) => a + b.price, 0),
                item.currencyKey
              )
            }}
          </p>
        </div>
      </div>
      <div v-if="earnings.render" class="flex my-2">
        <span
          class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
          >Ganancias</span
        >
        <div class="flex flex-col">
          <p class="ml-2 text-green-400 text-base">
            {{ currencyFormat(data.revenueWithoutExpenses - earnings.value, CURRENCIES[0].value) }}
          </p>
        </div>
      </div>
    </div>
    <hr class="border-slate-700 my-4" />
    <div class="flex flex-col">
      <template v-if="data.revenueWithoutExpenses === 0">
        <span
          class="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10"
          >No se registran ventas en el mes</span
        >
      </template>
      <template v-else>
        <p class="text-base">Ingresos: {{ currencyFormat(data.revenueWithoutExpenses) }}</p>
        <p v-if="data.allItems?.length" class="text-base">
          numero de ventas:
          {{ data.allItems.length }}
        </p>
      </template>
    </div>
    <hr class="border-slate-700 my-4" />
    <ul>
      <li
        v-for="expense in sortByCreatedA(data.allExpenses)"
        :key="expense._id"
        class="p-2 bg-gray-700 rounded-md my-3 flex list-none"
      >
        <div>
          <div class="rounded-full bg-gray-800 h-10 w-10 flex items-center justify-center">
            <instagram-icon v-if="expense.type === 'instagram_ad'" :size="22" />
            <facebook-icon v-else-if="expense.type === 'facebook_ad'" :size="22" />
            <diamond-icon v-else :size="18" />
          </div>
        </div>
        <div class="w-full ml-2">
          <p class="text-base">{{ expense.name }}</p>
          <p class="text-sm opacity-70">
            {{ currencyFormat(expense.price, expense.currency) }} -
            {{
              DateTime.fromISO(expense.created_at as string)
                .setLocale('es')
                .toFormat('cccc dd LLL')
            }}
          </p>
          <template v-if="expense.description">
            <hr class="my-2 opacity-30" />
            <p class="text-sm opacity-70 mb-1">{{ expense.description }}</p>
          </template>
        </div>
        <div>
          <RouterLink
            :to="`/expenses/edit/${expense._id}`"
            class="rounded-full hover:bg-gray-800 h-10 w-10 flex items-center justify-center"
          >
            <edit-icon :size="18" />
          </RouterLink>
        </div>
      </li>
    </ul>
  </li>
</template>

<script setup lang="ts">
import DiamondIcon from '@/components/icons/DiamondIcon.vue'
import FacebookIcon from '@/components/icons/FacebookIcon.vue'
import InstagramIcon from '@/components/icons/InstagramIcon.vue'
import EditIcon from '@/components/icons/EditIcon.vue'
import type { ExpenseInterface, MonthlySalesAndExpensesInterface } from '@/types/types.ts'
import { computed, type PropType } from 'vue'
import { localizeMonthInUI } from '../utils/dates.ts'
import { currencyFormat } from '../utils/currencyFormat.ts'
import { DateTime } from 'luxon'
import { CURRENCIES } from '@/constants/constants.ts'

const props = defineProps({
  data: {
    required: true,
    type: {} as PropType<MonthlySalesAndExpensesInterface>
  }
})

const earnings = computed<{
  render: boolean
  value: number
}>(() => {
  const expenseWithCurrency = props.data.sortedExpenses.find(
    (exp) => exp.currencyKey === CURRENCIES[0].value
  )
  let totalExpensesWithCurrency = 0

  if (expenseWithCurrency && expenseWithCurrency.items) {
    totalExpensesWithCurrency = expenseWithCurrency.items.reduce((a, b) => a + b.price, 0)
  }

  return {
    render: props.data.revenueWithoutExpenses - totalExpensesWithCurrency > 0,
    value: totalExpensesWithCurrency
  }
})

/**
 * Sorting the array by created_at property
 *
 */
function sortByCreatedA(array: ExpenseInterface[]) {
  return array.sort((a, b) => {
    const dateA = new Date(a.created_at as string).getTime()
    const dateB = new Date(b.created_at as string).getTime()
    return dateB - dateA
  })
}
</script>
