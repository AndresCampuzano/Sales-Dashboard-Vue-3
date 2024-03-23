<template>
  <div class="m-3 p-2.5 bg-gray-800 rounded-md">
    <div class="flex items-center">
      <div>IMAGE</div>
      <div class="ml-2.5">
        <p class="text-base">{{ data.clientName }}</p>
        <p class="text-base font-medium">
          @{{ data.nestedTableData.nestedClient.instagram_account }}
        </p>
        <p class="text-base font-thin">
          {{ DateTime.fromISO(data.date).setLocale('es').toFormat('cccc dd LLL') }} ({{
            DateTime.fromISO(data.date, {}).toRelative({ locale: 'es' })
          }})
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import type { SalesDataTable } from '@/types/types.ts'
import { DateTime } from 'luxon'

defineProps({
  data: {
    required: true,
    type: {} as PropType<SalesDataTable>
  }
})
</script>

<style scoped></style>
