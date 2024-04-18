<template>
  <li
    @click="isOpen = !isOpen"
    class="my-3 p-2.5 bg-gray-800 rounded-md cursor-pointer list-none"
    :class="{
      'border-l-4 border-green-700': data.isRecurrence
    }"
  >
    <div class="flex items-center">
      <template v-if="products === 1">
        <img
          :src="data.nestedTableData.nestedItems[0].image_src"
          alt="product 1"
          class="t-1-product-1 shared-styles-product-img"
        />
      </template>
      <template v-if="products === 2">
        <div class="products-container">
          <img
            :src="data.nestedTableData.nestedItems[0].image_src"
            alt="product 1"
            class="t-2-product-1 shared-styles-product-img"
          />
          <img
            :src="data.nestedTableData.nestedItems[1].image_src"
            alt="product 2"
            class="t-2-product-2 shared-styles-product-img"
          />
        </div>
      </template>
      <template v-if="products === 3">
        <div class="products-container">
          <img
            :src="data.nestedTableData.nestedItems[0].image_src"
            alt="product 1"
            class="t-3-product-1 shared-styles-product-img"
          />
          <img
            :src="data.nestedTableData.nestedItems[1].image_src"
            alt="product 2"
            class="t-3-product-2 shared-styles-product-img"
          />
          <img
            :src="data.nestedTableData.nestedItems[2].image_src"
            alt="product 3"
            class="t-3-product-3 shared-styles-product-img"
          />
        </div>
      </template>
      <template v-if="products === 4">
        <div class="products-container">
          <img
            :src="data.nestedTableData.nestedItems[0].image_src"
            alt="product 1"
            class="t-4-product-1 shared-styles-product-img"
          />
          <img
            :src="data.nestedTableData.nestedItems[1].image_src"
            alt="product 2"
            class="t-4-product-2 shared-styles-product-img"
          />
          <img
            :src="data.nestedTableData.nestedItems[2].image_src"
            alt="product 3"
            class="t-4-product-3 shared-styles-product-img"
          />
          <img
            :src="data.nestedTableData.nestedItems[3].image_src"
            alt="product 4"
            class="t-4-product-4 shared-styles-product-img"
          />
        </div>
      </template>
      <template v-if="products >= 5">
        <div class="products-container">
          <img
            :src="data.nestedTableData.nestedItems[0].image_src"
            alt="product 1"
            class="t-5-product-1 shared-styles-product-img"
          />
          <img
            :src="data.nestedTableData.nestedItems[1].image_src"
            alt="product 2"
            class="t-5-product-2 shared-styles-product-img"
          />
          <img
            :src="data.nestedTableData.nestedItems[2].image_src"
            alt="product 3"
            class="t-5-product-3 shared-styles-product-img"
          />
          <img
            :src="data.nestedTableData.nestedItems[3].image_src"
            alt="product 4"
            class="t-5-product-4 shared-styles-product-img"
          />
          <div class="floating-container-total-products just-animation">
            <p class="text-black">{{ products }}</p>
          </div>
        </div>
      </template>
      <div class="ml-3">
        <p class="text-base font-medium">{{ data.clientName }}</p>
        <p class="text-base">{{ data.city }} / {{ data.department }}</p>
        <p class="text-base font-thin">
          {{
            DateTime.fromISO(data.date)
              .setLocale('es')
              .toLocaleString(DateTime.DATE_MED_WITH_WEEKDAY)
          }}
          ({{ DateTime.fromISO(data.date, {}).toRelative({ locale: 'es' }) }})
        </p>
      </div>
    </div>
    <template v-if="isOpen">
      <div class="fade-in">
        <hr class="border-slate-700 mt-4" />
        <div class="grid grid-cols-1 mt-4">
          <div>
            <ul class="mb-4">
              <li
                v-for="item in data.nestedTableData.nestedItems"
                :key="item.id"
                class="p-2 bg-gray-700 rounded-md my-3 list-none"
              >
                <div class="flex items-center">
                  <img
                    :src="item.image_src"
                    :alt="item.name"
                    class="single-product-img shared-styles-product-img"
                  />
                  <div class="ml-3 flex w-full">
                    <p class="text-base">
                      {{ item.name }}
                      <colored-badge :label="item.color" :color="item.color" />
                    </p>

                    <p class="ml-auto mr-2">{{ currencyFormat(item.price) }}</p>
                  </div>
                </div>
              </li>
            </ul>
            <div class="w-full mb-4">
              <p class="w-fit ml-auto mr-2.5">Total: {{ currencyFormat(data.totalPrice) }}</p>
            </div>
          </div>
          <hr class="border-slate-700 mt-4" />
          <customer-item :data="data.nestedTableData.nestedClient" />
          <colored-badge
            class="ml-14 mb-3"
            :label="`${data.totalSales.length} ${data.isRecurrence ? 'compras realizadas' : 'compra realizada'} por el cliente`"
            primary
          />
        </div>
      </div>
    </template>
  </li>
</template>

<script lang="ts" setup>
import { computed, type PropType, ref } from 'vue'
import type { SalesDataTable } from '@/types/types.ts'
import { DateTime } from 'luxon'
import { currencyFormat } from '../utils/currencyFormat.ts'
import ColoredBadge from '@/components/ColoredBadge.vue'
import CustomerItem from '@/components/CustomerItem.vue'

const isOpen = ref(false)

const props = defineProps({
  data: {
    required: true,
    type: {} as PropType<SalesDataTable>
  }
})

const products = computed<number>(() => {
  return props.data?.nestedTableData.nestedItems.length
})
</script>

<style scoped>
.products-container {
  position: relative;
  width: 64px;
  height: 64px;
}
.shared-styles-product-img {
  border-radius: 100%;
  object-fit: cover;
}
.t-1-product-1 {
  height: 64px;
  width: 64px;
}
.t-2-product-1 {
  position: absolute;
  z-index: 1;
  top: 0;
  left: 0;
  height: 37px;
  width: 37px;
}
.t-2-product-2 {
  position: absolute;
  z-index: 1;
  right: 0;
  bottom: 0;
  height: 37px;
  width: 37px;
}
.t-3-product-1 {
  position: absolute;
  z-index: 1;
  top: 3px;
  left: 1px;
  height: 30px;
  width: 30px;
}
.t-3-product-2 {
  position: absolute;
  z-index: 1;
  top: 3px;
  right: 1px;
  height: 30px;
  width: 30px;
}
.t-3-product-3 {
  position: absolute;
  z-index: 1;
  bottom: 3px;
  left: 0;
  right: 0;
  margin: auto;
  height: 30px;
  width: 30px;
}

.t-4-product-1 {
  position: absolute;
  z-index: 1;
  top: 1px;
  left: 1px;
  height: 30px;
  width: 30px;
}
.t-4-product-2 {
  position: absolute;
  z-index: 1;
  top: 1px;
  right: 1px;
  height: 30px;
  width: 30px;
}
.t-4-product-3 {
  position: absolute;
  z-index: 1;
  bottom: 1px;
  left: 1px;
  height: 30px;
  width: 30px;
}
.t-4-product-4 {
  position: absolute;
  bottom: 1px;
  right: 1px;
  height: 30px;
  width: 30px;
}

.t-5-product-1 {
  position: absolute;
  z-index: 1;
  top: 1px;
  left: 1px;
  height: 30px;
  width: 30px;
}
.t-5-product-2 {
  position: absolute;
  z-index: 1;
  top: 1px;
  right: 1px;
  height: 30px;
  width: 30px;
}
.t-5-product-3 {
  position: absolute;
  z-index: 1;
  bottom: 1px;
  left: 1px;
  height: 30px;
  width: 30px;
}
.t-5-product-4 {
  position: absolute;
  z-index: 1;
  bottom: 1px;
  right: 1px;
  height: 30px;
  width: 30px;
}
.floating-container-total-products {
  position: absolute;
  z-index: 1;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 100%;
  height: 30px;
  width: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.single-product-img {
  height: 42px;
  width: 48px;
}
</style>
