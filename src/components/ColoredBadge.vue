<template>
  <span class="badge" :style="getColors">
    {{ label }}
  </span>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { colorFromConstants } from '@/utils/colorFromConstants.ts'

const props = defineProps({
  color: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    required: true
  },
  primary: {
    type: Boolean,
    default: false
  }
})

const getColors = computed(() => {
  return {
    backgroundColor: props.primary
      ? 'var(--color-primary)'
      : colorFromConstants(props.color).bgColor,
    color: props.primary ? '#fafafa' : colorFromConstants(props.color).textColor
  }
})
</script>

<style scoped>
.badge {
  padding: 0 12px;
  border-radius: 6px;
  width: fit-content;
}
</style>
