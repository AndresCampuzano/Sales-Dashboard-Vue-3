<template>
  <floating-buttons :menu="state.menu" />
  <main>
    <section class="max-w-lg m-auto px-3">
      <h1 class="text-2xl">Gastos y Rendimientos</h1>
      <ul>
        <li class="my-3 p-2.5 bg-gray-800 rounded-md list-none">
          <p class="mb-2 text-base">Abril 2024</p>
          <div>
            <div class="flex">
              <span
                class="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20"
                >Gastos</span
              >
              <div class="flex flex-col">
                <p class="ml-2 text-yellow-400 text-base">COP 35,000</p>
                <p class="ml-2 text-yellow-400 text-base">AUD 100</p>
              </div>
            </div>
            <div class="flex my-2">
              <span
                class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
                >Ganancias</span
              >
              <div class="flex flex-col">
                <p class="ml-2 text-green-400 text-base">COP 75,000</p>
              </div>
            </div>
          </div>
          <hr class="border-slate-700 my-4" />
          <div class="flex flex-col">
            <p class="text-base">Ingresos: COP 110,000</p>
            <p class="text-base">numero de ventas: 3</p>
          </div>
          <hr class="border-slate-700 my-4" />
          <ul>
            <li class="p-2 bg-gray-700 rounded-md my-3 flex list-none">
              <div>
                <div class="rounded-full bg-gray-800 h-10 w-10 flex items-center justify-center">
                  <diamond-icon v-if="false" :size="18" />
                  <facebook-icon v-else-if="false" :size="22" />
                  <instagram-icon v-else-if="true" :size="22" />
                </div>
              </div>
              <div class="w-full ml-2">
                <p class="text-base">Anuncio de Instagram</p>
                <p class="text-sm opacity-70">COP 35,000 - miércoles 03 abr</p>
                <hr class="my-2 opacity-30" />
                <p class="text-sm opacity-70 mb-1">Ejemplo de descripción extralargo test test</p>
              </div>
              <div>
                <div
                  class="rounded-full hover:bg-gray-800 h-10 w-10 flex items-center justify-center"
                >
                  <edit-icon :size="18" />
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </section>
  </main>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import FloatingButtons, { type Menu } from '@/components/FloatingButtons.vue'
import DiamondIcon from '@/components/icons/DiamondIcon.vue'
import FacebookIcon from '@/components/icons/FacebookIcon.vue'
import InstagramIcon from '@/components/icons/InstagramIcon.vue'
import EditIcon from '@/components/icons/EditIcon.vue'

const state = reactive({
  loading: true,
  menu: [
    {
      label: 'ventas',
      to: '/'
    },
    {
      label: 'nuevo gasto',
      to: '/expenses/new',
      forward: true
    },
    {
      label: 'broches',
      to: '/products'
    },
    {
      label: 'clientes',
      to: '/customers'
    }
  ] as Menu[]
})
</script>
