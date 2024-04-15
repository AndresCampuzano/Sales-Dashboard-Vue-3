<template>
  <div class="opaque-bg" v-if="isOpen"></div>
  <div class="floating" v-click-outside="onCloseMenu">
    <div class="anchor">
      <div @click="isOpen = !isOpen" class="main-button shadow-lg">
        <menu-icon :size="30" />
      </div>
      <template v-if="isOpen">
        <div class="menu" v-scroll-event="onCloseMenu">
          <div
            v-for="(item, index) in sortedMenu"
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
import { onBeforeMount, type PropType, ref } from 'vue'
import MenuIcon from '@/components/icons/MenuIcon.vue'

export interface Menu {
  label: string
  to: string
  forward?: boolean
  back?: boolean
}

const isOpen = ref<boolean>(false)
const sortedMenu = ref<Menu[]>([])

const props = defineProps({
  menu: {
    required: true,
    type: Array as PropType<Menu[]>
  }
})

onBeforeMount(() => {
  sortedMenu.value = props.menu.map((x) => ({ ...x }))?.reverse()
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
.opaque-bg {
  position: fixed;
  z-index: 2;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(22, 26, 28, 0.49);
  backdrop-filter: blur(4px);
}

.floating {
  z-index: 3;
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
      background-color: var(--color-primary);
      border: 1px solid rgba(187, 187, 187, 0.49);
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
            background-color: var(--color-primary);
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
