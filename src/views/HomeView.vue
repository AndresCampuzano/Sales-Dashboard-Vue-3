<template>
  <main>
    <h1>HOME</h1>
    <p>user: {{ user?.displayName }}</p>
    <FormButton text="Cerrar sesión" @click="onLogOut" style-type="secondary" />
    <section class="max-w-xl m-auto">
      <p v-if="state.loading">Cargando...</p>
      <summary-item v-for="(item, _) in state.data" :key="item.id" :data="item" />
    </section>
  </main>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import router from '@/router'
import { authStore } from '@/stores/auth'
import FormButton from '@/components/form-inputs/FormButton.vue'
import type { SalesDataTable } from '@/types/types.ts'
import { getSales } from '@/services/sale.service.ts'
import { prepareDataSales } from '@/utils/prepareDataSales.ts'
import SummaryItem from '@/components/SummaryItem.vue'

const { logoutFirebase, user } = authStore()

const state = reactive({
  loading: true,
  data: [] as SalesDataTable[]
})

onMounted(async () => {
  state.loading = true
  try {
    const data = await getSales()
    state.data = prepareDataSales(data)
  } catch (e) {
    console.error(e)
  } finally {
    state.loading = false
  }
})

async function onLogOut() {
  await logoutFirebase()
  await router.push('/login')
}
</script>

<style scoped></style>
