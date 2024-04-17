<template>
  <div class="mb-6">
    <label v-if="label" :for="id" class="block mb-2 font-medium"
      >{{ label }}
      <span v-if="required" class="text-red-600">*</span>
    </label>
    <input
      @change="onChangeImage"
      class="block w-full h-12 border rounded-lg cursor-pointer text-gray-400 focus:ring-blue-500 bg-gray-700 border-gray-600 placeholder-gray-400 disabled:opacity-40"
      :id="id"
      type="file"
      accept="image/*"
    />
    <img
      v-if="modelValue || base64OrUrlImg"
      :src="modelValue || base64OrUrlImg"
      alt="product image"
      class="rounded-full h-24 w-24 mt-3"
    />
    <div v-else class="rounded-full h-24 w-24 bg-slate-500 mt-3"></div>
  </div>
</template>

<script setup lang="ts">
import { defineEmits, defineProps, ref } from 'vue'
import { compressImage } from '@/utils/compressImage.ts'

const base64OrUrlImg = ref('')

defineProps({
  /**
   * Could be either base64 or URL
   */
  modelValue: {
    type: String,
    required: true
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
  /**
   * FIXME: not working
   */
  required: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

async function onChangeImage(e: any): Promise<void> {
  if (!e.target.files) return
  try {
    const image = await compressImage(e.target.files[0])
    base64OrUrlImg.value = image
    emit('update:modelValue', image)
  } catch (e) {
    console.error(e)
  }
}
</script>
