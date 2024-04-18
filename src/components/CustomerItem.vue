<template>
  <li @click="isOpen = !isOpen" class="p-2 bg-gray-800 rounded-md my-3 list-none">
    <div class="flex">
      <div class="flex">
        <div>
          <div
            class="rounded-full h-10 w-10 bg-gray-700 flex justify-center items-center"
            :style="{
              backgroundColor: dynamicColorFromString(getInitials())
            }"
          >
            <p class="capitalize">
              {{ getInitials() }}
            </p>
          </div>
        </div>
      </div>
      <div class="w-full ml-3">
        <div>
          <p class="text-base mb-2">{{ data.name }}</p>
          <p class="text-base mb-1">{{ data.address }}</p>
          <p class="text-base mb-1">{{ data.city }} / {{ data.department }}</p>
          <a
            :href="`https://www.instagram.com/${data.instagram_account}`"
            target="_blank"
            class="font-medium text-blue-500 hover:text-blue-600"
            >@{{ data.instagram_account }}</a
          >
          <div class="mb-1"></div>
          <a :href="'tel:' + data.phone" class="text-blue-500 hover:text-blue-600">{{
            data.phone
          }}</a>
          <p class="text-base font-thin opacity-80">
            Creado el
            {{
              DateTime.fromISO(data.created_at as string)
                .setLocale('es')
                .toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)
            }}
            ({{ DateTime.fromISO(data.created_at as string, {}).toRelative({ locale: 'es' }) }})
          </p>
          <template v-if="data?.comments">
            <hr class="border-slate-700 my-4" />
            <p class="text-base mb-1">{{ data.comments }}</p>
          </template>
        </div>
      </div>
      <div>
        <RouterLink
          :to="`/customers/edit/${data._id}`"
          class="rounded-full hover:bg-gray-800 h-10 w-10 flex items-center justify-center"
        >
          <edit-icon :size="18" />
        </RouterLink>
      </div>
    </div>
  </li>
</template>

<script lang="ts" setup>
import { type PropType, ref } from 'vue'
import type { Customer } from '@/types/types.ts'
import EditIcon from '@/components/icons/EditIcon.vue'
import { dynamicColorFromString } from '@/utils/colors.ts'
import { DateTime } from 'luxon'

const isOpen = ref(false)

const props = defineProps({
  data: {
    required: true,
    type: {} as PropType<Customer>
  }
})

/**
 * Returns initials based on customer's name and first last name
 * @example
 * getInitials('John Doe') // JD
 */
function getInitials(): string {
  return props.data.name.split('')[0] + props.data.name.split(' ')[1].split('')[0]
}
</script>
