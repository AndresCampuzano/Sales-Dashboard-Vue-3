import type { DirectiveBinding } from 'vue'

declare global {
  interface HTMLElement {
    clickOutsideEvent: (event: MouseEvent) => void
  }
}

export default {
  beforeMount(el: HTMLElement, binding: DirectiveBinding) {
    el.clickOutsideEvent = function (event: MouseEvent) {
      // Check if the clicked element is neither the element
      // to which the directive is applied nor its child
      if (!(el === event.target || el.contains(event.target as Node))) {
        // Invoke the provided method
        binding.value(event)
      }
    }
    document.addEventListener('click', el.clickOutsideEvent)
  },
  unmounted(el: HTMLElement) {
    // Remove the event listener when the bound element is unmounted
    document.removeEventListener('click', el.clickOutsideEvent)
  }
}
