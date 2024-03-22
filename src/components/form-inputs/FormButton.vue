<template>
  <button :type="type" class="hover:opacity-75 focus:ring-blue-500 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm w-full sm:w-auto sm:mr-6 mb-2.5 px-5 py-2.5 text-center disabled:opacity-75 disabled:bg-slate-600 disabled:cursor-not-allowed" :class="isPrimary ? 'bg-blue-800': 'bg-slate-500'" :disabled="disabled">{{ text }}</button>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, computed, type PropType } from 'vue'

const props = defineProps({
  type: {
    type: String as PropType<'button' | 'submit' | 'reset'>,
    default: 'button'
  },
  styleType: {
    type: String as PropType<'primary' | 'secondary'>,
    default: 'primary'
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

const isPrimary = computed<boolean>(() => {
  return props.styleType === 'primary'
})
</script>