<template>
  <div class="mb-6">
    <input
      v-model="parentValue"
      :value="value"
      @change="handleChange"
      type="radio"
      :id="id"
      :name="name"
      :required="required"
      :disabled="disabled"
      class="disabled:opacity-40"
    />
    <label :for="id" class="ml-2 font-medium">{{ label }}</label>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, getCurrentInstance, computed } from 'vue'

const instance = getCurrentInstance()

const props = defineProps({
  modelValue: {
    required: true,
    type: String
  },
  value: {
    required: true,
    type: String
  },
  id: {
    required: true,
    type: String
  },
  name: {
    required: true,
    type: String
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

<style lang="scss"></style>
