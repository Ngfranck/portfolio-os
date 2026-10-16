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
      });

      gsap.set(wordmark, {
        y: 20,
        opacity: 0,
      });

      gsap.set(progress, {
        scaleX: 0,
        transformOrigin: "left center",
      });

      const intro = gsap.timeline();

      intro.to(wordmark, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
      });

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

      intro.to(
        progress,
        {
          scaleX: 1,
          duration: 1.8,
          ease: "power2.out",
        },
        "<"
      );

      intro.to({}, { duration: 0.25 });

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
      className="fixed inset-0 z-[10000] flex h-screen w-screen items-center justify-center overflow-hidden bg-[#050505] text-white"
      aria-label="Chargement du portfolio"
      role="status"
    >
      <div className="relative flex w-[min(420px,80vw)] flex-col items-center">
        <div
          ref={wordmarkRef}
          className="mb-10 flex items-baseline leading-none"
        >
          <span className="font-sans text-3xl font-medium tracking-[-0.05em] sm:text-4xl">
            Gonar
          </span>

          <span className="font-sans text-3xl font-medium tracking-[-0.05em] text-[#E30613] sm:text-4xl">
            .ui
          </span>
        </div>

        <div className="flex w-full items-center justify-between">
          <span className="font-sans text-[10px] uppercase tracking-[0.28em] text-white/40">
            Portfolio
          </span>

          <span
            ref={counterRef}
            className="font-sans text-[10px] font-medium tabular-nums tracking-[0.2em] text-white/60"
          >
            0
          </span>
        </div>

        <div className="mt-3 h-px w-full overflow-hidden bg-white/10">
          <div
            ref={progressRef}
            className="h-full w-full bg-[#E30613]"
          />
        </div>

        <div className="mt-4 flex w-full items-center justify-between">
          <span className="font-sans text-[9px] uppercase tracking-[0.24em] text-white/20">
            Web &amp; Brand Designer
          </span>

          <span className="font-sans text-[9px] uppercase tracking-[0.24em] text-white/20">
            2026
          </span>
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(227,6,19,0.08), transparent 38%)",
        }}
      />

      <div
        className="pointer-events-none absolute bottom-8 left-8 font-sans text-[9px] uppercase tracking-[0.3em] text-white/20"
        aria-hidden="true"
      >
        F.01
      </div>

      <div
        className="pointer-events-none absolute bottom-8 right-8 font-sans text-[9px] uppercase tracking-[0.3em] text-white/20"
        aria-hidden="true"
      >
        Digital Portfolio
      </div>
    </div>
  );
}