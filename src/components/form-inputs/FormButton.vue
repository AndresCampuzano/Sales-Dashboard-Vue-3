<template>
  <button :type="type" class="bg-slate-800 hover:bg-blue-900 focus:ring-blue-500 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center" :disabled="disabled">{{ text }}</button>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, type PropType } from 'vue'

defineProps({
  type: {
    type: String as PropType<'button' | 'submit' | 'reset'>,
    default: 'button'
  },
  text: {
    type: String,
    default: "Button"
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

defineEmits(['update:modelValue'])
</script>