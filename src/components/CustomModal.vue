<template>
  <div class="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
    <div class="bg-gray-900 fixed inset-0 backdrop-blur-md bg-opacity-70 transition-opacity"></div>
    <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
      <div
        class="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0"
      >
        <div
          class="relative transform overflow-hidden rounded-lg text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg w-full max-w-lg"
        >
          <div class="bg-gray-800 px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
            <div class="sm:flex sm:items-start">
              <div
                class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full sm:mx-0 sm:h-10 sm:w-10"
                :class="isDanger ? 'bg-red-100' : 'bg-yellow-200'"
              >
                <svg
                  class="h-6 w-6 text-red-600"
                  :class="isDanger ? 'text-red-600' : 'text-yellow-600'"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
                  />
                </svg>
              </div>
              <div class="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                <h3 class="text-base font-semibold leading-6" id="modal-title">
                  {{ title }}
                </h3>
                <div class="mt-2">
                  <p class="text-base">
                    {{ description }}
                  </p>
                  <div class="content">
                    <slot />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="bg-gray-800 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <FormButton
              :text="primaryButton"
              @click="onSubmit"
              :style-type="isDanger ? 'danger' : 'primary'"
            />
            <FormButton
              v-if="secondaryButton"
              @click="onCloseModal"
              :text="secondaryButton"
              style-type="secondary"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import FormButton from '@/components/form-inputs/FormButton.vue'

defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: null
  },
  /**
   * Renders 'danger' buttons and icons
   */
  isDanger: {
    type: Boolean,
    default: false
  },
  primaryButton: {
    type: String,
    required: true
  },
  secondaryButton: {
    type: String,
    default: null
  },
  /**
   * Shows the slot #modal-content
   * TODO: finish logic
   */
  complex: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits<{
  (e: 'submit'): void
  (e: 'close'): void
}>()

function onCloseModal() {
  emit('close')
}

function onSubmit() {
  emit('submit')
  emit('close')
}
</script>
