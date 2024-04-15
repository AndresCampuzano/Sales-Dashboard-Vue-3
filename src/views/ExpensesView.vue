<template>
  <floating-buttons :menu="state.menu" />
  <main>
    <section class="max-w-lg m-auto px-3">
      <h1 class="text-2xl">Gastos y Rendimientos</h1>
      <loading-sales-item-skeleton v-if="state.loading" large />
      <ul v-else>
        <expense-item v-for="item in state.sales" :key="item.month" :data="item" />
      </ul>
    </section>
  </main>
</template>

<script lang="ts" setup>
import { onBeforeMount, reactive } from 'vue'
import { toast } from 'vue3-toastify'
import type { MonthlySalesAndExpensesInterface } from '@/types/types.ts'
import FloatingButtons, { type Menu } from '@/components/FloatingButtons.vue'
import ExpenseItem from '@/components/ExpenseItem.vue'
import LoadingSalesItemSkeleton from '@/components/LoadingSalesItemSkeleton.vue'
import { getSales } from '@/services/sale.service.ts'
import { getExpenses } from '@/services/expense.service.ts'
import { prepareDataSales } from '@/utils/prepareDataSales.ts'
import { groupSalesByMonth } from '@/utils/groupSalesByMonth.ts'

const state = reactive({
  loading: true,
  menu: [
    {
      label: 'ventas',
      to: '/'
    },
    {
      label: 'nuevo gasto',
      to: '/expenses/new',
      forward: true
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
  sales: [] as MonthlySalesAndExpensesInterface[]
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
  const sales = await getSales()
  const expenses = await getExpenses()

  const { salesWithExpenses } = groupSalesByMonth({
    sales: prepareDataSales(sales),
    expenses
  })
  state.sales = salesWithExpenses
}
</script>
