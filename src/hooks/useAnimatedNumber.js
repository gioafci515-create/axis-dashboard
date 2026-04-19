import { useState, useEffect, useRef } from "react";

export function useAnimatedNumber(target, duration = 600) {
  const [value, setValue] = useState(0);
  const hasAnimated = useRef(false);
  const frameRef = useRef(null);

  useEffect(() => {
    if (hasAnimated.current) {
      setValue(target);
      return;
    }

    hasAnimated.current = true;
    const start = performance.now();
    const from = 0;

    const animate = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(from + (target - from) * eased);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frameRef.current);
  }, [target, duration]);

  return value;
}
