import { useEffect, useRef, useState } from "react";

const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

export function useCountUp(target, { duration = 1200, start = 0, enabled = true } = {}) {
  const [value, setValue] = useState(start);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!enabled || target == null || Number.isNaN(Number(target))) {
      setValue(target ?? 0);
      return;
    }

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setValue(target);
      return;
    }

    const from = value;
    const to = Number(target);
    const delta = to - from;
    const startTs = performance.now();

    const tick = (now) => {
      const elapsed = now - startTs;
      const t = Math.min(1, elapsed / duration);
      const eased = easeOutExpo(t);
      setValue(from + delta * eased);
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, duration, enabled]);

  return value;
}
