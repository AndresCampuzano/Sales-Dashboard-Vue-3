<template>
  <div class="floating" v-click-outside="onCloseMenu">
    <div class="anchor">
      <div @click="isOpen = !isOpen" class="main-button">
        <menu-icon :size="30" />
      </div>
      <template v-if="isOpen">
        <div class="menu" v-scroll-event="onCloseMenu">
          <div
            v-for="(item, index) in menu"
            :key="item.label"
            @click="isOpen = !isOpen"
            class="menu-options-container"
            :style="{
              top: `-${dynamicPosition(index, 40)}px`,
              animationDelay: `${index / 10}s`
            }"
          >
            <div
              class="menu-options-container-item"
              :class="{
                forward: item.forward,
                back: item.back
              }"
            >
              <RouterLink :to="item.to">
                {{ item.label }}
              </RouterLink>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type PropType, ref } from 'vue'
import MenuIcon from '@/components/icons/MenuIcon.vue'

const isOpen = ref<boolean>(false)

export interface Menu {
  label: string
  to: string
  forward?: boolean
  back?: boolean
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
  right: 60px;
  bottom: 60px;

  @media (max-width: 600px) {
    right: 30px;
    bottom: 30px;
  }

  .anchor {
    position: relative;

    .main-button {
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #035294;
      color: white;
      border-radius: 50%;
      width: 50px;
      height: 50px;
      cursor: pointer;

      @media (max-width: 600px) {
        width: 60px;
        height: 60px;
      }
    }

    .menu {
      position: absolute;
      top: 0;

      &-options-container {
        opacity: 0; /* Start with 0 opacity */
        position: absolute;
        left: -52px;
        width: 140px;
        animation: fadeIn 0.1s linear forwards;

        @media (max-width: 600px) {
          left: -74px;
        }

        &-item {
          padding: 0 10px;
          color: black;
          background-color: #fafafa;
          height: 30px;
          border-radius: 6px;
          cursor: pointer;
          display: flex;
          justify-content: center;
          align-items: center;

          &.forward {
            color: #fafafa;
            background-color: #15803dff;
          }
          &.back {
            color: #fafafa;
            background-color: #035294;
          }
        }
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

//a.router-link-active {
//  background-color: lightblue;
//}
//a.router-link-exact-active {
//  background-color: #71ee8b;
//}
</style>
