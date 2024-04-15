<template>
  <li class="p-2 bg-gray-800 rounded-md my-3 flex list-none">
    <div class="flex items-center">
      <img :src="data.image" class="rounded-full h-10 w-12 object-cover" :alt="data.name" />
    </div>
    <div class="w-full ml-3">
      <div>
        <p class="text-base">{{ data.name }}</p>
        <div class="flex">
          <div
            v-for="item in data.available_colors"
            :key="item"
            class="rounded-full h-4 w-4 mr-1"
            :style="{
              backgroundColor: colorFromConstants(item).bgColor
            }"
          ></div>
        </div>
      </div>
    </div>
    <div>
      <RouterLink
        :to="`/products/edit/${data._id}`"
        class="rounded-full hover:bg-gray-800 h-10 w-10 flex items-center justify-center"
      >
        <edit-icon :size="18" />
      </RouterLink>
    </div>
  </li>
</template>

<script setup lang="ts">
import type { PropType } from 'vue'
import type { Item } from '@/types/types.ts'
import { colorFromConstants } from '@/utils/colorFromConstants.ts'
import EditIcon from '@/components/icons/EditIcon.vue'

const props = defineProps({
  data: {
    required: true,
    type: {} as PropType<Item>
  }
})
</script>
