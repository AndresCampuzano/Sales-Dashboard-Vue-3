<template>
  <form-input
    :id="id"
    v-model="query"
    :label="label"
    :placeholder="placeholder"
    type="text"
    :required="required"
    :disabled="disabled"
  />
  <p v-if="query.trim()" @click="clearQuery" class="text-base underline mt-2 mb-3">Limpiar</p>
  <ul>
    <li v-for="item in searchOptions" :key="item.value" @click="onSetValue(item.value)">
      {{ item.label }}
    </li>
  </ul>
</template>

<script lang="ts" setup>
/**
 * FIXME: Needs more work
 */

import FormInput from '@/components/form-inputs/FormInput.vue'
import { computed, defineProps, type PropType, ref } from 'vue'
import { normalizeString } from '@/utils/strings.ts'

const query = ref('')

interface SearchInput {
  label: string
  value: string
}

const emit = defineEmits<{
  (e: 'change', value: string): void
}>()

const props = defineProps({
  modelValue: {
    required: true,
    type: String
  },
  id: {
    required: true,
    type: String
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
  },
  options: {
    type: Array as PropType<SearchInput[]>,
    required: true
  }
})

const searchOptions = computed<SearchInput[]>(() => {
  if (query.value) {
    return props.options.filter((product) => {
      return normalizeString(product.label.toLowerCase()).includes(
        normalizeString(query.value.toLowerCase().trim())
      )
    })
  }
  return props.options
})

function clearQuery() {
  query.value = ''
}

function onSetValue(value: string) {
  query.value = props.options?.find((option) => option.value === value)?.label as string
  emit('change', query.value)
}
</script>
