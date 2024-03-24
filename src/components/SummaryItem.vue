<template>
  <div
    @click="isOpen = !isOpen"
    class="m-3 p-2.5 bg-gray-800 rounded-md cursor-pointer"
    :class="{
      'border-b-2 border-t-2 border-green-700': data.isRecurrence
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
          {{ DateTime.fromISO(data.date).setLocale('es').toFormat('cccc dd LLL') }} ({{
            DateTime.fromISO(data.date, {}).toRelative({ locale: 'es' })
          }})
        </p>
      </div>
    </div>
    <template v-if="isOpen">
      <div class="fade-in">
        <hr class="border-slate-700 mt-4" />
        <div class="grid grid-cols-1 divide-y divide-slate-700 mt-4">
          <div>
            <div class="mb-4">
              <div
                v-for="item in data.nestedTableData.nestedItems"
                :key="item.id"
                class="p-1 pb-2 bg-gray-700 rounded-md my-3"
              >
                <div class="flex items-center">
                  <img
                    :src="item.image_src"
                    :alt="item.name"
                    class="single-product-img shared-styles-product-img"
                  />
                  <div class="ml-3">
                    <p class="text-base">{{ item.name }}</p>
                    <div class="badge" :style="badgeColor(item.color)">
                      {{ item.color }}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div class="mt-4">CLIENT INFO</div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { computed, type PropType, ref } from 'vue'
import type { SalesDataTable } from '@/types/types.ts'
import { DateTime } from 'luxon'
import { colorFromConstants } from '@/utils/colorFromConstants.ts'

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

function badgeColor(color: string) {
  return {
    backgroundColor: colorFromConstants(color).bgColor,
    color: colorFromConstants(color).textColor
  }
}
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
  top: 0;
  left: 0;
  height: 37px;
  width: 37px;
}
.t-2-product-2 {
  position: absolute;
  right: 0;
  bottom: 0;
  height: 37px;
  width: 37px;
}
.t-3-product-1 {
  position: absolute;
  top: 3px;
  left: 1px;
  height: 30px;
  width: 30px;
}
.t-3-product-2 {
  position: absolute;
  top: 3px;
  right: 1px;
  height: 30px;
  width: 30px;
}
.t-3-product-3 {
  position: absolute;
  bottom: 3px;
  left: 0;
  right: 0;
  margin: auto;
  height: 30px;
  width: 30px;
}

.t-4-product-1 {
  position: absolute;
  top: 1px;
  left: 1px;
  height: 30px;
  width: 30px;
}
.t-4-product-2 {
  position: absolute;
  top: 1px;
  right: 1px;
  height: 30px;
  width: 30px;
}
.t-4-product-3 {
  position: absolute;
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
  top: 1px;
  left: 1px;
  height: 30px;
  width: 30px;
}
.t-5-product-2 {
  position: absolute;
  top: 1px;
  right: 1px;
  height: 30px;
  width: 30px;
}
.t-5-product-3 {
  position: absolute;
  bottom: 1px;
  left: 1px;
  height: 30px;
  width: 30px;
}
.t-5-product-4 {
  position: absolute;
  bottom: 1px;
  right: 1px;
  height: 30px;
  width: 30px;
}
.floating-container-total-products {
  position: absolute;
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
  width: 42px;
}

.badge {
  padding: 0 12px;
  border-radius: 6px;
  width: fit-content;
}

.container-background {
  position: absolute;
  top: 1px;
  right: 1px;
  bottom: 1px;
  left: 1px;
  border-radius: 6px;
  background: linear-gradient(-90deg, #007cf0, #00dfd8, #ff0080, #007cf0);
  background-size: 400% 100%;
  border: none;
  padding: 0;
  margin: 0;
  animation: backgroundAnimation 8s ease-in-out infinite;
}

@keyframes backgroundAnimation {
  50% {
    background-position: 140% 50%;
    transform: skew(-2deg);
  }
}

.container-background:after {
  content: '';
  position: absolute;
  background-size: inherit;
  background-image: inherit;
  -webkit-animation: inherit;
  animation: inherit;
  left: 0;
  right: 0;
  top: 2px;
  height: 100%;
  filter: blur(0.5rem);
}

@keyframes fadeTopToBottom {
  0% {
    opacity: 0;
    transform: translateY(-50px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in {
  animation: fadeTopToBottom 0.5s ease forwards;
}
</style>
