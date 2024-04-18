<template>
  <li class="p-2 bg-gray-800 rounded-md my-3 flex list-none">
    <div class="flex items-center">
      <!--      <img :src="data.image" class="rounded-full h-10 w-14 object-cover" :alt="data.name" />-->
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
    <div class="w-full ml-3">
      <div>
        <p class="text-base">{{ data.name }}</p>
        <p class="text-base">{{ data.address }}</p>
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
  </li>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue'
import type { Customer } from '@/types/types.ts'
import EditIcon from '@/components/icons/EditIcon.vue'
import { dynamicColorFromString } from '@/utils/colors.ts'

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
