<template>
  <div class="mb-6">
    <label v-if="label" :for="props.id" class="block mb-2 text-sm font-medium">{{ label }}</label>
    <input :value="modelValue" @input="$emit('update:modelValue', $event?.target?.value)" :type="type" :id="id" class="border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400" :placeholder="placeholder" :required="required" />
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from "vue"

const props = defineProps({
  modelValue: {
    required: true,
    type: String
  },
  id: {
    required: true,
    type: String
  },
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: ""
  },
  label: {
    type: String,
    default: ""
  },
  required: {
    type: Boolean,
    default: false
  },
})
defineEmits(['update:modelValue'])


</script>