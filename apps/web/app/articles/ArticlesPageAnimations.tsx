"use client";

import { ReactNode, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

type ArticlesPageAnimationsProps = {
  children: ReactNode;
};

export function ArticlesPageAnimations({
  children,
}: ArticlesPageAnimationsProps) {
  const pageRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const page = pageRef.current;

      if (!page) {
        return;
      }

      if (
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        return;
      }

      const ctx = gsap.context(() => {
        // ------------------------------------------------------------
        // HERO
        // ------------------------------------------------------------

        const hero = page.querySelector<HTMLElement>(
          "[data-articles-hero]"
        );

        const heroLabel = page.querySelector<HTMLElement>(
          "[data-articles-hero-label]"
        );

        const heroTitle = page.querySelector<HTMLElement>(
          "[data-articles-hero-title]"
        );

        const heroDescription = page.querySelector<HTMLElement>(
          "[data-articles-hero-description]"
        );

        gsap.set(heroLabel, {
          opacity: 0,
          y: 20,
        });

        gsap.set(heroTitle, {
          opacity: 0,
          y: 55,
          clipPath: "inset(0 0 100% 0)",
        });

        gsap.set(heroDescription, {
          opacity: 0,
          y: 25,
        });

        const heroTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: hero,
            start: "top 90%",
            end: "bottom 30%",
            toggleActions: "play none none none",
          },
        });

        if (heroLabel) {
          heroTimeline.to(heroLabel, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
          });
        }

        if (heroTitle) {
          heroTimeline.to(
            heroTitle,
            {
              opacity: 1,
              y: 0,
              clipPath: "inset(0 0 0% 0)",
              duration: 1,
              ease: "power4.out",
            },
            "-=0.25"
          );
        }

        if (heroDescription) {
          heroTimeline.to(
            heroDescription,
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              ease: "power3.out",
            },
            "-=0.55"
          );
        }

        // ------------------------------------------------------------
        // FEATURED ARTICLE
        // ------------------------------------------------------------

        const featuredSection = page.querySelector<HTMLElement>(
          "[data-articles-featured-section]"
        );

        const featuredLabel = page.querySelector<HTMLElement>(
          "[data-articles-featured-label]"
        );

        const featuredCard = page.querySelector<HTMLElement>(
          "[data-articles-featured-card]"
        );

        const featuredImage = page.querySelector<HTMLElement>(
          "[data-articles-featured-image]"
        );

        const featuredContent = page.querySelector<HTMLElement>(
          "[data-articles-featured-content]"
        );

        const featuredMeta = page.querySelector<HTMLElement>(
          "[data-articles-featured-meta]"
        );

        const featuredTitle = page.querySelector<HTMLElement>(
          "[data-articles-featured-title]"
        );

        const featuredDescription = page.querySelector<HTMLElement>(
          "[data-articles-featured-description]"
        );

        const featuredFooter = page.querySelector<HTMLElement>(
          "[data-articles-featured-footer]"
        );

        gsap.set(featuredLabel, {
          opacity: 0,
          y: 20,
        });

        gsap.set(featuredCard, {
          opacity: 0,
          y: 45,
          scale: 0.98,
        });

        gsap.set(featuredImage, {
          scale: 1.06,
        });

        gsap.set(featuredContent, {
          opacity: 0,
          x: 30,
        });

        gsap.set(featuredMeta, {
          opacity: 0,
          y: 15,
        });

        gsap.set(featuredTitle, {
          opacity: 0,
          y: 25,
        });

        gsap.set(featuredDescription, {
          opacity: 0,
          y: 20,
        });

        gsap.set(featuredFooter, {
          opacity: 0,
          y: 15,
        });

        const featuredTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: featuredSection,
            start: "top 82%",
            end: "bottom 18%",
            toggleActions: "play none none none",
          },
        });

        if (featuredLabel) {
          featuredTimeline.to(featuredLabel, {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: "power3.out",
          });
        }

        if (featuredCard) {
          featuredTimeline.to(
            featuredCard,
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.8,
              ease: "power3.out",
            },
            "-=0.2"
          );
        }

        if (featuredImage) {
          featuredTimeline.to(
            featuredImage,
            {
              scale: 1,
              duration: 1.1,
              ease: "power3.out",
            },
            "-=0.65"
          );
        }

        if (featuredContent) {
          featuredTimeline.to(
            featuredContent,
            {
              opacity: 1,
              x: 0,
              duration: 0.65,
              ease: "power3.out",
            },
            "-=0.8"
          );
        }

        if (featuredMeta) {
          featuredTimeline.to(
            featuredMeta,
            {
              opacity: 1,
              y: 0,
              duration: 0.45,
              ease: "power3.out",
            },
            "-=0.4"
          );
        }

        if (featuredTitle) {
          featuredTimeline.to(
            featuredTitle,
            {
              opacity: 1,
              y: 0,
              duration: 0.65,
              ease: "power3.out",
            },
            "-=0.25"
          );
        }

        if (featuredDescription) {
          featuredTimeline.to(
            featuredDescription,
            {
              opacity: 1,
              y: 0,
              duration: 0.55,
              ease: "power3.out",
            },
            "-=0.3"
          );
        }

        if (featuredFooter) {
          featuredTimeline.to(
            featuredFooter,
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: "power3.out",
            },
            "-=0.25"
          );
        }

        // ------------------------------------------------------------
        // LATEST ARTICLES
        // ------------------------------------------------------------

        const latestSection = page.querySelector<HTMLElement>(
          "[data-articles-latest-section]"
        );

        const latestHeader = page.querySelector<HTMLElement>(
          "[data-articles-latest-header]"
        );

        const latestTitle = page.querySelector<HTMLElement>(
          "[data-articles-latest-title]"
        );

        const latestCount = page.querySelector<HTMLElement>(
          "[data-articles-latest-count]"
        );

        const latestGrid = page.querySelector<HTMLElement>(
          "[data-articles-latest-grid]"
        );

        const latestCards = page.querySelectorAll<HTMLElement>(
          "[data-articles-latest-card]"
        );

        gsap.set(latestHeader, {
          opacity: 0,
          y: 25,
        });

        gsap.set(latestGrid, {
          opacity: 0,
          y: 30,
        });

        gsap.set(latestCards, {
          opacity: 0,
          y: 40,
          scale: 0.975,
        });

        const latestTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: latestSection,
            start: "top 82%",
            end: "bottom 15%",
            toggleActions: "play none none none",
          },
        });

        if (latestHeader) {
          latestTimeline.to(latestHeader, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "power3.out",
          });
        }

        if (latestTitle) {
          latestTimeline.to(
            latestTitle,
            {
              opacity: 1,
              y: 0,
              duration: 0.45,
              ease: "power3.out",
            },
            "-=0.35"
          );
        }

        if (latestCount) {
          latestTimeline.to(
            latestCount,
            {
              opacity: 1,
              y: 0,
              duration: 0.4,
              ease: "power3.out",
            },
            "-=0.4"
          );
        }

        if (latestGrid) {
          latestTimeline.to(
            latestGrid,
            {
              opacity: 1,
              y: 0,
              duration: 0.45,
              ease: "power2.out",
            },
            "-=0.2"
          );
        }

        if (latestCards.length > 0) {
          latestTimeline.to(
            latestCards,
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.7,
              stagger: 0.12,
              ease: "power3.out",
            },
            "-=0.25"
          );
        }

        // ------------------------------------------------------------
        // REFRESH
        // ------------------------------------------------------------

        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
        });
      }, pageRef);

      return () => {
        ctx.revert();
      };
    },
    {
      scope: pageRef,
    }
  );

  return (
    <main
      ref={pageRef}
      className="
        min-h-screen
        bg-[var(--portfolio-background)]
        text-[var(--portfolio-text-primary)]
      "
    >
      {children}
    </main>
  );
}