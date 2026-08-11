import { useCallback, useRef } from 'react';

/**
 * Pointer-tracking magnetic attraction for primary CTAs only — the button
 * leans a few pixels toward the cursor while hovered, then springs back on
 * leave with the system's tactile overshoot curve. Reserved for the single
 * highest-intent action in a given area; not applied to secondary/outline
 * buttons or nav, so it stays a considered signal instead of noise.
 * No-ops entirely under prefers-reduced-motion.
 */
export function useMagnetic<T extends HTMLElement>(strength = 0.25) {
  const ref = useRef<T>(null);
  const reduceMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (reduceMotion) return;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transition = 'transform 0.15s ease-out';
      el.style.transform = `translate(${x * strength}px, ${y * strength}px) scale(1.04)`;
    },
    [strength, reduceMotion]
  );

  const onMouseLeave = useCallback(() => {
    if (reduceMotion) return;
    const el = ref.current;
    if (!el) return;
    el.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
    el.style.transform = 'translate(0, 0) scale(1)';
  }, [reduceMotion]);

  return { ref, onMouseMove, onMouseLeave };
}
