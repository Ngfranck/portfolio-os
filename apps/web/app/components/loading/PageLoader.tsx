"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export function PageLoader() {
  const loaderRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loader = loaderRef.current;
    const counter = counterRef.current;
    const progress = progressRef.current;
    const wordmark = wordmarkRef.current;

    if (!loader || !counter || !progress || !wordmark) {
      return;
    }

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    document.body.style.overflow = "hidden";

    if (reducedMotion) {
      counter.textContent = "100";
      progress.style.transform = "scaleX(1)";

      const timer = window.setTimeout(() => {
        gsap.set(loader, {
          autoAlpha: 0,
          pointerEvents: "none",
        });

        document.body.style.overflow = "";
      }, 300);

      return () => {
        window.clearTimeout(timer);
        document.body.style.overflow = "";
      };
    }

    const context = gsap.context(() => {
      const counterValue = { value: 0 };

      gsap.set(loader, {
        autoAlpha: 1,
        clipPath: "inset(0 0 0 0)",
      });

      gsap.set(wordmark, {
        y: 24,
        opacity: 0,
      });

      gsap.set(progress, {
        scaleX: 0,
        transformOrigin: "left center",
      });

      const intro = gsap.timeline();

      // Apparition de Gonar
      intro.to(wordmark, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
      });

      // Compteur
      intro.to(
        counterValue,
        {
          value: 100,
          duration: 1.8,
          ease: "power2.out",
          onUpdate: () => {
            counter.textContent = Math.round(
              counterValue.value
            ).toString();
          },
        },
        "-=0.25"
      );

      // Barre de progression
      intro.to(
        progress,
        {
          scaleX: 1,
          duration: 1.8,
          ease: "power2.out",
        },
        "<"
      );

      // Petit temps de respiration
      intro.to({}, {
        duration: 0.25,
      });

      // Transition vers la Hero
      intro.to(loader, {
        clipPath: "inset(0 0 100% 0)",
        duration: 1.1,
        ease: "power4.inOut",
        onComplete: () => {
          document.body.style.overflow = "";

          gsap.set(loader, {
            autoAlpha: 0,
            pointerEvents: "none",
          });
        },
      });
    }, loaderRef);

    return () => {
      context.revert();
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-[10000] h-screen w-screen overflow-hidden bg-[#050505] text-white"
      aria-label="Loading portfolio"
      role="status"
    >
      {/* Main loading area */}
      <div
        className="
          absolute
          bottom-[8vh]
          left-1/2
          w-[calc(100%-3rem)]
          max-w-[1400px]
          -translate-x-1/2
        "
      >
        <div
          ref={wordmarkRef}
          className="
            flex
            w-full
            items-baseline
            gap-6
            leading-none
          "
        >
          {/* Brand name */}
          <span
            className="
              shrink-0
              font-sans
              text-[clamp(3rem,7vw,7rem)]
              font-medium
              leading-[0.85]
              tracking-[-0.07em]
            "
          >
            Gonar
          </span>

          {/* Loading line */}
          <div className="flex min-w-0 flex-1 items-center">
            <div
              className="
                h-px
                w-full
                overflow-hidden
                bg-white/15
              "
            >
              <div
                ref={progressRef}
                className="h-full w-full bg-white"
              />
            </div>
          </div>

          {/* Percentage */}
          <span
            ref={counterRef}
            className="
              shrink-0
              font-sans
              text-[clamp(0.7rem,1vw,0.9rem)]
              font-medium
              tabular-nums
              tracking-[-0.02em]
              text-white/70
            "
          >
            0
          </span>
        </div>
      </div>
    </div>
  );
}