<template>
  <div class="mb-6">
    <label v-if="label" :for="id" class="block mb-2 font-medium"
      >{{ label }}
      <span v-if="required" class="text-red-600">*</span>
    </label>
    <input
      :value="modelValue"
      @input="$emit('update:modelValue', ($event?.target as HTMLInputElement)?.value)"
      :type="type"
      :id="id"
      class="border rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 disabled:opacity-40"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
    />
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'

defineProps({
  modelValue: {
    required: true,
    type: [Number, String]
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
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

defineEmits(['update:modelValue'])
</script>
