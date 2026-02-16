export type FadeInOptions = {
  rootMargin?: string;
  threshold?: number;
  once?: boolean;
  delayStepMs?: number; // stagger via data-index or order
};

export function fadeIn(node: HTMLElement, opts: FadeInOptions = {}) {
  const { rootMargin = '0px 0px -10% 0px', threshold = 0.1, once = true } = opts;

  node.classList.add('opacity-0', 'translate-y-4', 'transition', 'duration-500', 'ease-out', 'will-change-transform');

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        node.classList.remove('opacity-0', 'translate-y-4');
        node.classList.add('opacity-100', 'translate-y-0');
        if (once) io.unobserve(node);
      }
    });
  }, { root: null, rootMargin, threshold });

  io.observe(node);

  return {
    destroy() {
      io.unobserve(node);
      io.disconnect();
    }
  };
}
