<template>
  <div class="floating" v-click-outside="onCloseMenu">
    <div class="anchor">
      <div @click="isOpen = !isOpen" class="main-button">
        <add-icon :size="30" />
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
            <div class="menu-options-container-item">
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
import AddIcon from '@/components/icons/AddIcon.vue'

const isOpen = ref<boolean>(false)

interface Menu {
  label: string
  to: string
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

      &:hover {
        opacity: 0.75;
      }
    }

    .menu {
      position: absolute;
      top: 0;

      &-options-container {
        opacity: 0; /* Start with 0 opacity */
        position: absolute;
        left: -52px;
        width: 100px;
        animation: fadeIn 0.1s linear forwards;

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

          &:hover {
            opacity: 0.75;
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
</style>
