<template>
  <li @click="isOpen = !isOpen" class="p-2 bg-gray-800 rounded-md my-3 list-none">
    <div class="flex">
      <div class="flex">
        <div>
          <div
            class="rounded-full h-10 w-10 bg-gray-700 flex justify-center items-center"
            :style="{
              backgroundColor: dynamicColorFromString(getInitials())
            }"
          >
            <p class="capitalize">
              {{ getInitials() }}
            </p>
          </div>
        </div>
      </div>
      <div class="w-full ml-3">
        <div class="flex flex-col">
          <p class="text-base mb-1">{{ data.name }}</p>
          <template v-if="!previewMode">
            <p class="text-base mb-1">{{ data.address }}</p>
          </template>
          <p class="text-base mb-1">{{ data.city }} / {{ data.department }}</p>
          <template v-if="!previewMode">
            <a
              :href="`https://www.instagram.com/${data.instagram_account}`"
              target="_blank"
              class="font-medium text-blue-500 hover:text-blue-600 mb-1"
              >@{{ data.instagram_account }}</a
            >
            <a :href="'tel:' + data.phone" class="text-blue-500 hover:text-blue-600">{{
              data.phone
            }}</a>
            <template v-if="data?.cc">
              <p class="text-base mb-1">cc {{ data.cc }}</p>
            </template>
            <template v-if="!snapshotMode">
              <p class="text-base font-thin opacity-80">
                Creado el
                {{
                  DateTime.fromISO(data.created_at as string)
                    .setLocale('es')
                    .toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)
                }}
                ({{ DateTime.fromISO(data.created_at as string, {}).toRelative({ locale: 'es' }) }})
              </p>
              <p v-if="data.updated_at" class="text-base font-thin opacity-80">
                Editado el
                {{
                  DateTime.fromISO(data.updated_at as string)
                    .setLocale('es')
                    .toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)
                }}
                ({{ DateTime.fromISO(data.updated_at as string, {}).toRelative({ locale: 'es' }) }})
              </p>
            </template>
            <template v-if="data?.comments">
              <hr class="border-slate-700 my-4" />
              <p class="text-base mb-1">Comentarios: {{ data.comments }}</p>
            </template>
            <template v-if="snapshotMode">
              <hr class="border-slate-700 my-4" />
              <p class="text-base font-thin opacity-80">
                Información del cliente guardada al momento de generar la venta, ésta puede no
                coincidir con la información actual del cliente en caso de que el cliente se
                modifique después de generada la venta.
              </p>
            </template>
          </template>
        </div>
      </div>
      <div v-if="!hideIcon">
        <RouterLink
          :to="`/customers/edit/${data._id}`"
          class="rounded-full hover:bg-gray-800 h-10 w-10 flex items-center justify-center"
        >
          <edit-icon :size="18" />
        </RouterLink>
      </div>
    </div>
  </li>
</template>

<script lang="ts" setup>
import { type PropType, ref } from 'vue'
import type { Customer } from '@/types/types.ts'
import EditIcon from '@/components/icons/EditIcon.vue'
import { dynamicColorFromString } from '@/utils/colors.ts'
import { DateTime } from 'luxon'

const isOpen = ref(false)

const props = defineProps({
  data: {
    required: true,
    type: {} as PropType<Customer>
  },
  /**
   * Only shows name and location
   */
  previewMode: {
    type: Boolean,
    default: false
  },
  /**
   * Hides created_at and updated_at timestamps
   * This is because when a customer is saved as snapshot,
   * the information saved is a 'print' of what it used to be when saved in the DB,
   * so the created_at and updated_at could not match with real customer's information.
   */
  snapshotMode: {
    type: Boolean,
    default: false
  },
  hideIcon: {
    type: Boolean,
    default: false
  }
})

/**
 * Returns initials based on customer's name and first last name
 * @example
 * getInitials('John Doe') // JD
 */
function getInitials(): string {
  return props.data.name.split('')[0] + props.data.name.split(' ')[1].split('')[0]
}
</script>
