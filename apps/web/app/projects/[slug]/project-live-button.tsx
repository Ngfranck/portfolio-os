"use client";

import { useRef } from "react";
import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowUpRight01Icon,
  Globe02Icon,
} from "@hugeicons/core-free-icons";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface ProjectLiveButtonProps {
  url?: string;
}

export function ProjectLiveButton({
  url,
}: ProjectLiveButtonProps) {
  const buttonRef = useRef<HTMLAnchorElement | null>(null);
  const globeRef = useRef<HTMLSpanElement | null>(null);
  const arrowRef = useRef<HTMLSpanElement | null>(null);

  useGSAP(() => {
    const button = buttonRef.current;
    const globe = globeRef.current;
    const arrow = arrowRef.current;

    if (!button) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      return;
    }

    // ------------------------------------------------------------
    // INITIAL STATE
    // ------------------------------------------------------------

    gsap.set(button, {
      opacity: 0,
      y: 24,
      scale: 0.94,
    });

    if (globe) {
      gsap.set(globe, {
        opacity: 0,
        scale: 0.75,
        rotate: -12,
      });
    }

    if (arrow) {
      gsap.set(arrow, {
        opacity: 0,
        x: -5,
        y: 5,
      });
    }

    // ------------------------------------------------------------
    // ENTRANCE
    // ------------------------------------------------------------

    const timeline = gsap.timeline({
      delay: 0.8,
    });

    timeline.to(button, {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.75,
      ease: "power3.out",
    });

    if (globe) {
      timeline.to(
        globe,
        {
          opacity: 1,
          scale: 1,
          rotate: 0,
          duration: 0.45,
          ease: "back.out(1.7)",
        },
        "-=0.45"
      );
    }

    if (arrow) {
      timeline.to(
        arrow,
        {
          opacity: 1,
          x: 0,
          y: 0,
          duration: 0.4,
          ease: "power3.out",
        },
        "-=0.3"
      );
    }
  });

  if (!url?.trim()) {
    return null;
  }

  return (
    <a
      ref={buttonRef}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Voir le projet en ligne"
      className="
        group
        fixed
        bottom-6
        right-6
        z-[100]
        inline-flex
        h-12
        items-center
        gap-2.5
        rounded-full
        border
        border-[var(--portfolio-border)]
        bg-[var(--portfolio-surface)]
        px-5
        font-display
        text-[13px]
        font-medium
        tracking-[-0.01em]
        text-[var(--portfolio-text-primary)]
        shadow-[0_10px_35px_rgba(0,0,0,0.10)]
        backdrop-blur-xl
        transition-all
        duration-[var(--portfolio-motion-fast)]
        hover:-translate-y-1
        hover:shadow-[0_16px_45px_rgba(0,0,0,0.15)]
        active:translate-y-0
        dark:border-white/[0.10]
        dark:bg-[#171717]/90
        dark:text-white
        dark:shadow-[0_10px_35px_rgba(0,0,0,0.35)]
        dark:hover:shadow-[0_16px_45px_rgba(0,0,0,0.45)]
        sm:bottom-8
        sm:right-8
      "
    >
      {/* Globe */}
      <span ref={globeRef} className="flex shrink-0">
        <HugeiconsIcon
          icon={Globe02Icon}
          size={16}
          strokeWidth={1.7}
          className="
            shrink-0
            text-[var(--portfolio-text-secondary)]
            transition-colors
            duration-[var(--portfolio-motion-fast)]
            group-hover:text-[var(--portfolio-accent)]
            dark:text-white/60
            dark:group-hover:text-[var(--portfolio-accent)]
          "
        />
      </span>

      <span>Voir le projet</span>

      {/* Arrow */}
      <span ref={arrowRef} className="flex shrink-0">
        <HugeiconsIcon
          icon={ArrowUpRight01Icon}
          size={15}
          strokeWidth={1.8}
          className="
            shrink-0
            text-[var(--portfolio-accent)]
            transition-transform
            duration-[var(--portfolio-motion-fast)]
            group-hover:translate-x-0.5
            group-hover:-translate-y-0.5
          "
        />
      </span>
    </a>
  );
}