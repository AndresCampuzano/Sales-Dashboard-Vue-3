<template>
  <li class="p-2 bg-gray-800 rounded-md my-3 flex list-none">
    <div class="flex items-center">
      <img :src="data.image" class="rounded-full h-10 w-14 object-cover" :alt="data.name" />
    </div>
    <div class="w-full ml-3">
      <div>
        <p class="text-base">{{ data.name }}</p>
        <p class="text-base">{{ currencyFormat(data.price) }}</p>
        <div v-if="!previewMode" class="flex">
          <div
            v-for="item in data.available_colors"
            :key="item"
            class="rounded-full h-4 w-4 mr-1"
            :style="{
              backgroundColor: colorFromLocalConstants(item).bgColor
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
import type { Product } from '@/types/types.ts'
import { colorFromLocalConstants } from '@/utils/colors.ts'
import EditIcon from '@/components/icons/EditIcon.vue'
import { currencyFormat } from '@/utils/currencyFormat.ts'

defineProps({
  data: {
    required: true,
    type: {} as PropType<Product>
  },
  /**
   * If enabled, colors circles will be hidden
   */
  previewMode: {
    type: Boolean,
    default: false
  }
})
</script>
