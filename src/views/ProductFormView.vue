<template>
  <floating-buttons :menu="state.menu" />
  <main>
    <section class="max-w-lg m-auto px-3">
      <h1 v-if="state.editing" class="text-2xl">Editar Producto</h1>
      <h1 v-else class="text-2xl">Nuevo Producto</h1>
      <loading-form-skeleton v-if="state.loading" />
      <form v-else class="mx-6 mt-6 mb-24" @submit.prevent="onSubmit">
        <form-input
          v-model="state.form.name"
          id="name"
          type="text"
          label="Nombre del producto"
          placeholder="ej. Canguro"
          :disabled="state.lockUI"
          required
        />
        <form-input
          v-model="state.form.price"
          id="price"
          type="number"
          label="Precio del producto"
          placeholder="ej. Hilos"
          :disabled="state.lockUI"
          required
        />
        <form-image
          v-model="state.form.image"
          label="Imagen del producto"
          id="image_upload"
          required
        />
        <div class="mb-6">
          <p class="block mb-2 font-medium">
            Colores seleccionados del producto <span class="text-red-600">*</span>
          </p>
          <div class="w-full flex flex-wrap border rounded-lg p-2.5 bg-gray-700 border-gray-600">
            <colored-badge
              v-for="item in unselectedBadges"
              :key="item.label"
              @click="deleteFromSelectedArr(item.label)"
              :label="item.label"
              :color="item.label"
              class="m-1 cursor-pointer"
            />
          </div>
        </div>
        <div class="mb-6">
          <p class="block mb-2 font-medium">
            Colores disponibles <span class="text-red-600">*</span>
          </p>
          <div class="w-full flex flex-wrap border rounded-lg p-2.5 bg-gray-700 border-gray-600">
            <colored-badge
              v-for="item in selectedBadgesOptions"
              :key="item.label"
              @click="addToSelectedArr(item.label)"
              :label="item.label"
              :color="item.label"
              class="m-1 cursor-pointer"
            />
          </div>
        </div>
        <FormButton
          :text="state.editing ? 'Editar' : 'Guardar'"
          style-type="primary"
          type="submit"
          :disabled="!isFormFilledUp || state.lockUI"
        />
        <FormButton
          v-if="state.editing"
          @click="onOpenModal"
          text="Eliminar"
          type="button"
          style-type="danger"
          :disabled="state.lockUI"
        />
      </form>
    </section>
  </main>
  <custom-modal
    v-if="state.modal"
    title="Eliminar broche"
    :description="`¿Deseas eliminar el broche ${state.form.name}?`"
    primary-button="Eliminar"
    secondary-button="Cancelar"
    is-danger
    @close="onCloseModal"
    @submit="onDelete"
  />
</template>

<script lang="ts" setup>
import { computed, onBeforeMount, reactive, watch } from 'vue'
import { useRoute } from 'vue-router'
import { toast } from 'vue3-toastify'
import appRouter from '@/router'
import FloatingButtons, { type Menu } from '@/components/FloatingButtons.vue'
import LoadingFormSkeleton from '@/components/LoadingFormSkeleton.vue'
import FormInput from '@/components/form-inputs/FormInput.vue'
import FormButton from '@/components/form-inputs/FormButton.vue'
import FormImage from '@/components/form-inputs/FormImage.vue'
import { COLORS } from '@/constants/constants.ts'
import ColoredBadge from '@/components/ColoredBadge.vue'
import type { Item } from '@/types/types.ts'
import { deleteItem, getItem, postItem, updateItem } from '@/services/item.service.ts'
import CustomModal from '@/components/CustomModal.vue'

const router = useRoute()
const productId = router.params.id as string

const state = reactive({
  // loading: true, TODO: CHANGE  <-----------------------
  loading: false,
  editing: false,
  lockUI: false,
  menu: [
    {
      label: 'ventas',
      to: '/'
    },
    {
      label: 'gastos',
      to: '/expenses'
    },
    {
      label: 'broches',
      to: '/products',
      active: true
    },
    {
      label: 'clientes',
      to: '/customers'
    }
  ] as Menu[],
  form: {
    name: '',
    price: 0,
    image: '', // base64 or URL
    selectedColors: [] as Array<string>
    // unselectedColors: [] as Array<string>
  },
  modal: false
})

onBeforeMount(async () => {
  if (productId) {
    state.editing = true
    try {
      await fetchAndLoadData()
    } catch (e) {
      toast.error('Error al obtener la información. ' + e)
    } finally {
      state.loading = false
    }
  } else {
    state.form.price = 100000
    state.loading = false
  }
})

// Sets the price to 0 if the input is empty
watch(
  () => state.form.price,
  (value: any) => {
    // string | number
    if (typeof value === 'string') {
      state.form.price = Number(value)
    } else if (value === '' || isNaN(value)) {
      state.form.price = 0
    }
  }
)

const selectedBadgesOptions = computed(() => {
  return COLORS.filter((item: any) => !state.form.selectedColors.includes(item.label))
})

const unselectedBadges = computed(() => {
  return COLORS.filter((item: any) => state.form.selectedColors.includes(item.label))
})

const isFormFilledUp = computed<boolean>(() => {
  const { name, price, image, selectedColors } = state.form
  return name.trim().length > 0 && price > 0 && image.trim().length > 0 && selectedColors.length > 0
})

async function fetchAndLoadData() {
  const { name, price, image, available_colors } = await getItem(productId)
  state.form.name = name
  state.form.price = price
  state.form.image = image
  state.form.selectedColors = available_colors
}

async function onSubmit() {
  const { name, price, image, selectedColors } = state.form

  if (!isFormFilledUp.value) return

  const data: Item = {
    name,
    price,
    image,
    available_colors: selectedColors
  }

  try {
    if (state.editing) {
      await updateItem(productId, data)
    } else {
      await postItem(data)
    }
    toast.success('Datos guardados!')
    state.lockUI = true
    goBack()
  } catch (e) {
    toast.error('Revisa los datos e intentalo nuevamente. ' + e)
    state.lockUI = false
  }
}

// Go back one step in history
function goBack() {
  setTimeout(() => {
    const pathToGoBack = router.fullPath.split('/')[1]
    appRouter.push('/' + pathToGoBack)
  }, 3000)
}

async function onDelete() {
  try {
    await deleteItem(productId)
    toast.warning('Datos borrados')
    state.lockUI = true
    goBack()
  } catch (e) {
    toast.error('Revisa los datos e intentalo nuevamente. ' + e)
    state.lockUI = false
  }
}

function addToSelectedArr(label: string) {
  const item = COLORS.find((x) => x.label === label)?.label as string
  state.form.selectedColors = [...state.form.selectedColors, item]
}

function deleteFromSelectedArr(label: string) {
  state.form.selectedColors = state.form.selectedColors.filter((item: string) => item !== label)
}

function onOpenModal() {
  state.modal = true
}

function onCloseModal() {
  state.modal = false
}
</script>
