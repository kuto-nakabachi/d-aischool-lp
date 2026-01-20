"use client";

import React, { ReactNode, ElementType } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

type AnimationType =
  | "fade-up"
  | "fade-down"
  | "fade-left"
  | "fade-right"
  | "scale"
  | "slide-up"
  | "blur";

interface ScrollRevealProps {
  children: ReactNode;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
  as?: ElementType;
}

const animationStyles: Record<AnimationType, { initial: string; animate: string }> = {
  "fade-up": {
    initial: "opacity-0 translate-y-8",
    animate: "opacity-100 translate-y-0",
  },
  "fade-down": {
    initial: "opacity-0 -translate-y-8",
    animate: "opacity-100 translate-y-0",
  },
  "fade-left": {
    initial: "opacity-0 translate-x-8",
    animate: "opacity-100 translate-x-0",
  },
  "fade-right": {
    initial: "opacity-0 -translate-x-8",
    animate: "opacity-100 translate-x-0",
  },
  scale: {
    initial: "opacity-0 scale-95",
    animate: "opacity-100 scale-100",
  },
  "slide-up": {
    initial: "opacity-0 translate-y-12",
    animate: "opacity-100 translate-y-0",
  },
  blur: {
    initial: "opacity-0 blur-sm",
    animate: "opacity-100 blur-0",
  },
};

export const ScrollReveal = ({
  children,
  animation = "fade-up",
  delay = 0,
  duration = 600,
  className = "",
  threshold = 0.1,
  as: Component = "div",
}: ScrollRevealProps) => {
  const [ref, isVisible] = useScrollAnimation<HTMLDivElement>({ threshold });

  const { initial, animate } = animationStyles[animation];

  return (
    <Component
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`transition-all ease-out ${isVisible ? animate : initial} ${className}`}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </Component>
  );
};

// スタガーアニメーション用のコンテナ
interface StaggerContainerProps {
  children: ReactNode;
  staggerDelay?: number;
  animation?: AnimationType;
  duration?: number;
  className?: string;
  threshold?: number;
}

export const StaggerContainer = ({
  children,
  staggerDelay = 100,
  animation = "fade-up",
  duration = 600,
  className = "",
  threshold = 0.1,
}: StaggerContainerProps) => {
  const [ref, isVisible] = useScrollAnimation<HTMLDivElement>({ threshold });
  const { initial, animate } = animationStyles[animation];

  return (
    <div ref={ref} className={className}>
      {React.Children.map(children, (child, index) => (
        <div
          className={`transition-all ease-out ${isVisible ? animate : initial}`}
          style={{
            transitionDuration: `${duration}ms`,
            transitionDelay: `${index * staggerDelay}ms`,
          }}
        >
          {child}
        </div>
      ))}
    </div>
  );
};
