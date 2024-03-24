<template>
  <div class="floating" v-click-outside="onCloseMenu">
    <div class="anchor">
      <div @click="isOpen = !isOpen" class="main-button">
        {{ isOpen }}
      </div>
      <template v-if="isOpen">
        <div class="menu" v-scroll-event="onCloseMenu">
          <div
            v-for="(item, index) in menu"
            :key="item.label"
            @click="isOpen = !isOpen"
            class="menu-item"
            :style="{
              top: `-${dynamicPosition(index, 40)}px`,
              animationDelay: `${index / 10}s`
            }"
          >
            {{ item.label }} {{}}
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type PropType, ref } from 'vue'

const isOpen = ref<boolean>(false)

interface Menu {
  label: string
  action: string
  color?: string
}

defineProps({
  menu: {
    required: true,
    type: Array as PropType<Menu[]>
  }
})

function dynamicPosition(index: number, base: number): number {
  if (index === 0) {
    return base
  } else {
    const i = index + 1
    return i * base
  }
}

function onCloseMenu() {
  isOpen.value = false
}
</script>

<style scoped lang="scss">
.floating {
  z-index: 1;
  position: fixed;
  right: 20px;
  bottom: 20px;

  .anchor {
    position: relative;

    .main-button {
      background-color: red;
      color: white;
      border-radius: 50%;
      width: 40px;
      height: 40px;
    }

    .menu {
      position: absolute;
      top: 0;

      &-item {
        opacity: 0; /* Start with 0 opacity */
        position: absolute;
        width: 30px;
        height: 30px;
        color: black;
        background-color: #b9b9b9;
        border-radius: 50%;
        animation: fadeIn 0.1s linear forwards;
      }

      @keyframes fadeIn {
        from {
          opacity: 0;
        }
        to {
          opacity: 1;
        }
      }
    }
  }
}
</style>
