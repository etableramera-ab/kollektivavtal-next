"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

type Phase = "ssr" | "hidden" | "visible";

export function AnimatedSection({ children, className, delay = 0 }: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>("ssr");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setPhase("visible");
      return;
    }

    const rect = el.getBoundingClientRect();
    const inView = rect.top < window.innerHeight && rect.bottom > 0;
    if (inView) {
      setPhase("visible");
      return;
    }

    setPhase("hidden");
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setPhase("visible");
          obs.disconnect();
        }
      },
      { rootMargin: "-50px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const hidden = phase === "hidden";
  const style: React.CSSProperties = {
    opacity: hidden ? 0 : 1,
    transform: hidden ? "translateY(30px)" : "none",
    transition: phase === "ssr" ? undefined : `opacity 0.6s ${delay}s ease-out, transform 0.6s ${delay}s ease-out`,
  };

  return (
    <div ref={ref} className={className} style={style}>
      {children}
    </div>
  );
}
