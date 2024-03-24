import type { DirectiveBinding } from 'vue'

declare global {
  interface HTMLElement {
    scrollEvent: (event: Event) => void
  }
}

export default {
  beforeMount(el: HTMLElement, binding: DirectiveBinding) {
    el.scrollEvent = function (event: Event) {
      // Invoke the provided method with scroll event
      binding.value(event)
    }
    document.addEventListener('scroll', el.scrollEvent)
  },
  unmounted(el: HTMLElement) {
    // Remove the event listener when the bound element is unmounted
    document.removeEventListener('scroll', el.scrollEvent)
  }
}
