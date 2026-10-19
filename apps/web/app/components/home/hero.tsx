
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { HugeiconsIcon } from "@hugeicons/react";
import { ArrowUpRight01Icon } from "@hugeicons/core-free-icons";

gsap.registerPlugin(ScrollTrigger);

type HeroProps = {
  siteName: string;
  ownerName: string | null;
  siteTagline: string | null;
  siteDescription: string | null;
  isAvailableForProjects: boolean;
};

export function Hero({
  siteName,
  ownerName,
  siteTagline,
  siteDescription,
  isAvailableForProjects,
}: HeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const wolfRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const hero = heroRef.current;
      const wolf = wolfRef.current;
      const glow = glowRef.current;
      const content = contentRef.current;
      const name = nameRef.current;
      const badge = badgeRef.current;
      const description = descriptionRef.current;
      const actions = actionsRef.current;

      if (
        !hero ||
        !wolf ||
        !glow ||
        !content ||
        !name ||
        !badge ||
        !description ||
        !actions
      ) {
        return;
      }

      const stars = gsap.utils.toArray<HTMLElement>(
        ".hero-shooting-star",
        hero
      );

      const mm = gsap.matchMedia();

      mm.add(
        {
          desktop: "(min-width: 768px)",
          reducedMotion: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { desktop, reducedMotion } = context.conditions as {
            desktop: boolean;
            reducedMotion: boolean;
          };

          // ACCESSIBILITÉ : afficher le contenu sans animation.

          if (reducedMotion) {
            gsap.set(wolf, {
              opacity: 1,
              scale: 1,
              x: 0,
              y: 0,
              clipPath: "none",
            });

            gsap.set([name, badge, description, actions], {
              clearProps: "all",
            });

            gsap.set(glow, {
              opacity: 0.2,
              scale: 1,
            });

            gsap.set(stars, {
              opacity: 0,
            });

            return;
          }

          // ÉTAT INITIAL

          gsap.set(wolf, {
            opacity: 0,
            scale: 0.88,
            x: 0,
            y: 0,
            clipPath: "circle(0% at 50% 45%)",
            transformOrigin: "center center",
          });

          gsap.set(glow, {
            opacity: 0,
            scale: 0.65,
            xPercent: -50,
            yPercent: -50,
          });

          gsap.set(name, {
            opacity: 0,
            y: 36,
            clipPath: "inset(0% 0% 100% 0%)",
          });

          gsap.set([badge, description, actions], {
            opacity: 0,
            y: 24,
          });

          gsap.set(stars, {
            opacity: 0,
            transformOrigin: "left center",
          });

          // APPARITION CINÉMATIQUE DU LOUP

          const entrance = gsap.timeline({
            defaults: {
              ease: "power3.out",
            },
          });

          entrance
            .to(
              wolf,
              {
                opacity: 1,
                scale: 1,
                clipPath: "circle(85% at 50% 45%)",
                duration: 2.1,
                ease: "power2.inOut",
              },
              0
            )
            .to(
              glow,
              {
                opacity: 0.42,
                scale: 1,
                duration: 2,
                ease: "power2.out",
              },
              0.35
            )
            .to(
              name,
              {
                opacity: 1,
                y: 0,
                clipPath: "inset(0% 0% 0% 0%)",
                duration: 1.15,
              },
              0.55
            )
            .to(
              badge,
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
              },
              0.95
            )
            .to(
              description,
              {
                opacity: 1,
                y: 0,
                duration: 0.9,
              },
              1.1
            )
            .to(
              actions,
              {
                opacity: 1,
                y: 0,
                duration: 0.8,
              },
              1.3
            );

          // RESPIRATION DISCRÈTE

          const breathing = gsap.to(wolf, {
            scale: 1.018,
            duration: 6,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: 2.2,
          });

          // ÉTOILES FILANTES ROUGES

          const starAnimations: gsap.core.Timeline[] = [];

          stars.forEach((star, index) => {
            const starAnimation = gsap.timeline({
              repeat: -1,
              repeatDelay: 3.5 + index * 1.1,
              delay: 1.8 + index * 1.4,
            });

            starAnimation
              .set(star, {
                x: -35,
                y: -18,
                opacity: 0,
                scaleX: 0.45,
              })
              .to(star, {
                opacity: 0.9,
                scaleX: 1,
                duration: 0.2,
                ease: "power1.out",
              })
              .to(star, {
                x: 125,
                y: 72,
                opacity: 0,
                scaleX: 0.55,
                duration: 1.15,
                ease: "power2.out",
              });

            starAnimations.push(starAnimation);
          });

          // PARALLAXE DESKTOP

          let handleMouseMove: ((event: MouseEvent) => void) | undefined;
          let handleMouseLeave: (() => void) | undefined;

          if (desktop) {
            gsap.to(wolf, {
              yPercent: 3,
              ease: "none",
              scrollTrigger: {
                trigger: hero,
                start: "top top",
                end: "bottom top",
                scrub: 2,
              },
            });

            gsap.to(content, {
              yPercent: -2,
              ease: "none",
              scrollTrigger: {
                trigger: hero,
                start: "top top",
                end: "bottom top",
                scrub: 2.5,
              },
            });

            handleMouseMove = (event: MouseEvent) => {
              const rect = hero.getBoundingClientRect();
              const x = event.clientX - rect.left;
              const y = event.clientY - rect.top;

              gsap.to(glow, {
                x,
                y,
                opacity: 0.48,
                duration: 0.7,
                ease: "power2.out",
                overwrite: "auto",
              });

              gsap.to(wolf, {
                x: (x / rect.width - 0.5) * -6,
                duration: 1,
                ease: "power2.out",
                overwrite: "auto",
              });
            };

            handleMouseLeave = () => {
              gsap.to(glow, {
                opacity: 0,
                duration: 0.6,
                ease: "power2.out",
                overwrite: "auto",
              });

              gsap.to(wolf, {
                x: 0,
                duration: 0.9,
                ease: "power2.out",
                overwrite: "auto",
              });
            };

            hero.addEventListener("mousemove", handleMouseMove, {
              passive: true,
            });

            hero.addEventListener("mouseleave", handleMouseLeave);
          }

          return () => {
            entrance.kill();
            breathing.kill();

            starAnimations.forEach((animation) => animation.kill());

            if (handleMouseMove) {
              hero.removeEventListener("mousemove", handleMouseMove);
            }

            if (handleMouseLeave) {
              hero.removeEventListener("mouseleave", handleMouseLeave);
            }

            gsap.killTweensOf([wolf, glow, content]);
          };
        }
      );

      return () => mm.revert();
    },
    { scope: heroRef }
  );

  const displayName = ownerName?.trim() || siteName;
  const displayTagline = siteTagline?.trim() || "Web & Brand Designer";

  const displayDescription =
    siteDescription?.trim() ||
    "Je conçois des identités, des interfaces et des expériences digitales qui transforment les idées en marques mémorables.";

  return (
    <section
      ref={heroRef}
      id="home"
      aria-labelledby="hero-title"
      className="
        relative isolate
        min-h-[100svh]
        overflow-hidden
        bg-[var(--portfolio-background)]
        text-[var(--portfolio-text-primary)]
        transition-colors
        duration-[var(--portfolio-motion-normal)]
      "
    >
      {/* BACKGROUND */}

      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        {/* ILLUSTRATION DU LOUP */}

        <div
          ref={wolfRef}
          className="
            absolute
            left-1/2
            top-[20%]
            w-[min(72vw,380px)]
            aspect-[473.25/573.72]
            -translate-x-1/2
            -translate-y-1/2
            bg-[var(--portfolio-text-primary)]
            opacity-0
            will-change-[transform,opacity,clip-path]
          "
          style={{
            WebkitMaskImage: "url('/images/hero/wolf.svg')",
            maskImage: "url('/images/hero/wolf.svg')",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskPosition: "center",
            maskPosition: "center",
            WebkitMaskSize: "contain",
            maskSize: "contain",
          }}
        />

        {/* HALO LUMINEUX */}

        <div
          ref={glowRef}
          className="
            absolute
            left-1/2
            top-[34%]
            h-[min(75vw,440px)]
            w-[min(75vw,440px)]
            -translate-x-1/2
            -translate-y-1/2
            rounded-full
            opacity-0
            blur-[75px]
            will-change-transform
          "
          style={{
            background:
              "radial-gradient(circle, color-mix(in srgb, var(--portfolio-text-primary) 12%, transparent) 0%, transparent 70%)",
          }}
        />

        {/* GRILLE TECHNIQUE */}

        <div
          className="
            absolute inset-0
            text-[var(--portfolio-text-primary)]
          "
          style={{
            backgroundImage: `
              linear-gradient(currentColor 1px, transparent 1px),
              linear-gradient(90deg, currentColor 1px, transparent 1px)
            `,
            backgroundSize: "64px 64px",
            opacity: 0.045,
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 18%, black 75%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 18%, black 75%, transparent 100%)",
          }}
        />

        {/* ÉTOILES FILANTES ROUGES */}

        <div
          className="hero-shooting-star absolute left-[8%] top-[26%] h-px w-20"
          style={{
            background:
              "linear-gradient(90deg, transparent, var(--portfolio-accent))",
            boxShadow: "0 0 8px var(--portfolio-accent)",
            transform: "rotate(30deg)",
          }}
        />

        <div
          className="hero-shooting-star absolute left-[66%] top-[19%] h-px w-24"
          style={{
            background:
              "linear-gradient(90deg, transparent, var(--portfolio-accent))",
            boxShadow: "0 0 8px var(--portfolio-accent)",
            transform: "rotate(30deg)",
          }}
        />

        <div
          className="hero-shooting-star absolute left-[72%] top-[47%] h-px w-16"
          style={{
            background:
              "linear-gradient(90deg, transparent, var(--portfolio-accent))",
            boxShadow: "0 0 8px var(--portfolio-accent)",
            transform: "rotate(30deg)",
          }}
        />

        <div
          className="hero-shooting-star absolute left-[18%] top-[54%] h-px w-24"
          style={{
            background:
              "linear-gradient(90deg, transparent, var(--portfolio-accent))",
            boxShadow: "0 0 8px var(--portfolio-accent)",
            transform: "rotate(30deg)",
          }}
        />

        <div
          className="hero-shooting-star absolute left-[48%] top-[13%] h-px w-16"
          style={{
            background:
              "linear-gradient(90deg, transparent, var(--portfolio-accent))",
            boxShadow: "0 0 8px var(--portfolio-accent)",
            transform: "rotate(30deg)",
          }}
        />

        {/* LUEURS ROUGES SUBTILES */}

        <div
          className="
            absolute
            left-[4%]
            top-[28%]
            h-[320px]
            w-[320px]
            rounded-full
            bg-[radial-gradient(circle,var(--portfolio-accent)_0%,transparent_70%)]
            opacity-[0.045]
            blur-[100px]
          "
        />

        <div
          className="
            absolute
            left-1/2
            top-[25%]
            h-[480px]
            w-[480px]
            -translate-x-1/2
            rounded-full
            bg-[radial-gradient(circle,var(--portfolio-accent-soft)_0%,transparent_70%)]
            opacity-[0.10]
            blur-[35px]
          "
        />
      </div>

      {/* CONTENU */}

      <div
        ref={contentRef}
        className="
          relative z-10
          mx-auto flex
          min-h-[100svh]
          w-full max-w-[1800px]
          flex-col justify-end
          px-5 pb-10 pt-28
          sm:px-8 sm:pb-12
          lg:px-12 lg:pb-14
          xl:px-16
        "
      >
        {/* SIGNATURE SUPÉRIEURE */}

        <div className="mb-auto flex items-center justify-between gap-4 pt-2">
          <span className="font-body text-xs tracking-[0.18em] text-[var(--portfolio-text-muted)] uppercase">
            Portfolio · Gonar.ui
          </span>

          <span className="flex items-center gap-2 font-body text-xs text-[var(--portfolio-text-secondary)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--portfolio-accent)]" />
            Design with intention
          </span>
        </div>

        {/* INFORMATIONS ET NOM */}

        <div
          className="
            grid w-full grid-cols-1
            items-end gap-7
            lg:grid-cols-[minmax(0,1fr)_minmax(320px,440px)]
            lg:gap-12
            xl:grid-cols-[minmax(0,1fr)_460px]
            xl:gap-16
          "
        >
          {/* NOM */}

          <div className="min-w-0">
            <p className="mb-3 font-body text-xs tracking-[0.2em] text-[var(--portfolio-text-muted)] uppercase sm:text-sm">
              Bonjour, je suis
            </p>

            <h1
              ref={nameRef}
              id="hero-title"
              className="
                max-w-full
                break-words
                font-display
                text-[clamp(2.5rem,5.5vw,5rem)]
                font-semibold
                leading-[0.95]
                tracking-[-0.055em]
                text-[var(--portfolio-text-primary)]
                will-change-[transform,opacity,clip-path]
                lg:whitespace-nowrap
              "
            >
              {displayName}
            </h1>

            <p className="mt-4 max-w-xl font-signature text-sm leading-relaxed text-[var(--portfolio-text-secondary)] sm:text-base">
              {displayTagline}
            </p>
          </div>

          {/* PRÉSENTATION ET ACTIONS */}

          <div className="flex w-full flex-col items-start lg:justify-self-end">
            {/* DISPONIBILITÉ */}

            <div
              ref={badgeRef}
              className="
                mb-5 inline-flex max-w-full
                flex-wrap items-center gap-2
                rounded-full border
                border-[var(--portfolio-border)]
                bg-[var(--portfolio-background)]
                px-3 py-2
                font-body text-xs
                text-[var(--portfolio-text-secondary)]
                sm:text-[13px]
                will-change-[transform,opacity]
              "
            >
              <span
                aria-hidden="true"
                className="
                  h-2 w-2 shrink-0 rounded-full
                  bg-[var(--portfolio-accent)]
                  shadow-[0_0_0_3px_rgba(227,6,19,0.12)]
                "
              />

              <span>
                {isAvailableForProjects
                  ? "Disponible pour vos projets"
                  : "Actuellement indisponible"}
              </span>
            </div>

            {/* DESCRIPTION */}

            <p
              ref={descriptionRef}
              className="
                max-w-[440px]
                font-body
                text-base
                leading-[1.6]
                tracking-[-0.01em]
                text-[var(--portfolio-text-secondary)]
                sm:text-lg
                will-change-[transform,opacity]
              "
            >
              {displayDescription}
            </p>

            {/* BOUTONS */}

            <div
              ref={actionsRef}
              className="
                mt-6 flex w-full flex-col gap-3
                sm:w-auto sm:flex-row
                will-change-[transform,opacity]
              "
            >
              <a
                href="#projects"
                data-cursor="magnetic"
                className="
                  group inline-flex h-12
                  items-center justify-center gap-2
                  rounded-full
                  bg-[var(--portfolio-text-primary)]
                  px-6
                  font-body text-sm font-medium
                  text-[var(--portfolio-background)]
                  transition-transform
                  duration-[var(--portfolio-motion-fast)]
                  hover:-translate-y-0.5
                  hover:scale-[1.02]
                "
              >
                Voir mes projets

                <HugeiconsIcon
                  icon={ArrowUpRight01Icon}
                  size={16}
                  strokeWidth={1.8}
                  color="var(--portfolio-accent)"
                  aria-hidden="true"
                  className="
                    transition-transform
                    duration-[var(--portfolio-motion-fast)]
                    group-hover:translate-x-0.5
                    group-hover:-translate-y-0.5
                  "
                />
              </a>

              <a
                href="#about"
                data-cursor="magnetic"
                className="
                  inline-flex h-12
                  items-center justify-center
                  rounded-full border
                  border-[var(--portfolio-border)]
                  bg-[var(--portfolio-background)]
                  px-6
                  font-body text-sm font-medium
                  text-[var(--portfolio-text-primary)]
                  transition-transform
                  duration-[var(--portfolio-motion-fast)]
                  hover:-translate-y-0.5
                "
              >
                À propos de moi
              </a>
            </div>
          </div>
        </div>

        {/* PIED DU HERO */}

        <div
          className="
            mt-10 flex items-center justify-between gap-4
            border-t border-[var(--portfolio-border)]
            pt-4
          "
        >
          <span className="font-body text-[10px] tracking-[0.12em] text-[var(--portfolio-text-muted)] uppercase sm:text-xs">
            UX/UI · Brand identity · Digital
          </span>

          <a
            href="#projects"
            className="
              font-body text-xs
              text-[var(--portfolio-text-secondary)]
              transition-colors
              hover:text-[var(--portfolio-accent)]
            "
          >
            Explorer ↓
          </a>
        </div>
      </div>
    </section>
  );
}
