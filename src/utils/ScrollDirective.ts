import type { DirectiveBinding } from 'vue'

declare global {
  interface HTMLElement {
    scrollEvent: (event: Event) => void
  }
}

/**
 * Directive to trigger a given action when scroll is executed.
 *
 */
const ScrollDirective = {
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
export default ScrollDirective
