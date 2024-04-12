<template>
  <div class="mb-6">
    <label :for="id" class="block mb-2 font-medium">{{ label }}</label>
    <select
      v-model="parentValue"
      :id="id"
      @change="handleChange"
      :required="required"
      class="border rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400"
    >
      <option disabled value="">{{ placeholder }}</option>
      <option v-for="item in selectOptions" :key="item.value" :value="item.value">
        {{ item.value }}
      </option>
    </select>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, getCurrentInstance, computed } from 'vue'

const instance = getCurrentInstance()

export interface SelectOptions {
  label: string
  value: string
}

const props = defineProps({
  modelValue: {
    required: true,
    type: String
  },
  selectOptions: {
    type: Array as () => Array<SelectOptions>,
    required: true
  },
  id: {
    required: true,
    type: String
  },
  label: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: 'placeholder'
  },
  required: {
    type: Boolean,
    default: false
  }
})

defineEmits(['update:modelValue'])

const parentValue = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    instance?.emit('update:modelValue', value)
  }
})

function handleChange(e: Event) {
  instance?.emit('update:modelValue', (e?.target as HTMLInputElement)?.value)
}
</script>

<style lang="scss" scoped></style>
