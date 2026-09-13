import type { Directive } from "vue";

/**
 * `v-reveal` — element ko'rinadigan bo'lsa (scroll paytida) silliq ochiladi.
 * Ishlatilishi: <div v-reveal> yoki <div v-reveal="200"> (delay ms).
 * IntersectionObserver bo'lmasa element zudlik bilan ko'rinadi.
 */
const observed = new WeakMap<Element, IntersectionObserver>();

function show(el: HTMLElement) {
  el.classList.add("reveal-visible");
  observed.get(el)?.unobserve(el);
  observed.delete(el);
}

export const reveal: Directive<HTMLElement, number | undefined> = {
  mounted(el, binding) {
    el.classList.add("reveal");
    if (typeof binding.value === "number") {
      el.style.setProperty("--reveal-delay", `${binding.value}ms`);
    }

    if (typeof IntersectionObserver === "undefined") {
      el.classList.add("reveal-visible");
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            show(el);
          }
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    observed.set(el, io);
  },
  unmounted(el) {
    observed.get(el)?.disconnect();
    observed.delete(el);
  },
};
