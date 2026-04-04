"use client";

import { useEffect, useState, useRef } from "react";

interface CountUpProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}

export function CountUp({ end, suffix = "", prefix = "", duration = 2 }: CountUpProps) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  // Use a simple IntersectionObserver with rootMargin to detect even invisible parents
  useEffect(() => {
    if (hasStarted) return;
    const el = ref.current;
    if (!el) return;

    // Fallback: start after a short delay if observer never fires
    const fallback = setTimeout(() => {
      setHasStarted(true);
    }, 1500);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
          clearTimeout(fallback);
        }
      },
      { threshold: 0, rootMargin: "200px" }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;
    let start = 0;
    const step = end / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [hasStarted, end, duration]);

  // Show the final value in noscript/SSR, animate on client
  return (
    <span ref={ref}>
      {prefix}
      {hasStarted ? count.toLocaleString("sv-SE") : end.toLocaleString("sv-SE")}
      {suffix}
    </span>
  );
}
