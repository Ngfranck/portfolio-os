"use client";

import { ReactNode, useRef } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

type ArticlePageAnimationsProps = {
  children: ReactNode;
};

export function ArticlePageAnimations({
  children,
}: ArticlePageAnimationsProps) {
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
        const back = page.querySelector<HTMLElement>(
          "[data-article-back]"
        );

        const category = page.querySelector<HTMLElement>(
          "[data-article-category]"
        );

        const title = page.querySelector<HTMLElement>(
          "[data-article-title]"
        );

        const excerpt = page.querySelector<HTMLElement>(
          "[data-article-excerpt]"
        );

        const meta = page.querySelector<HTMLElement>(
          "[data-article-meta]"
        );

        const cover = page.querySelector<HTMLElement>(
          "[data-article-cover]"
        );

        const coverImage = page.querySelector<HTMLElement>(
          "[data-article-cover-image]"
        );

        const articleContent = page.querySelector<HTMLElement>(
          "[data-article-content]"
        );

        const contentBlocks = page.querySelectorAll<HTMLElement>(
          "[data-article-content-block]"
        );

        const footerCta = page.querySelector<HTMLElement>(
          "[data-article-footer]"
        );

        const footerLabel = page.querySelector<HTMLElement>(
          "[data-article-footer-label]"
        );

        const footerTitle = page.querySelector<HTMLElement>(
          "[data-article-footer-title]"
        );

        const footerButton = page.querySelector<HTMLElement>(
          "[data-article-footer-button]"
        );

        /*
         * ============================================================
         * INITIAL STATES
         * ============================================================
         */

        const introElements = [
          back,
          category,
          title,
          excerpt,
          meta,
          footerLabel,
          footerTitle,
          footerButton,
        ].filter(
          (element): element is HTMLElement => Boolean(element)
        );

        if (introElements.length > 0) {
          gsap.set(introElements, {
            opacity: 0,
            y: 24,
          });
        }

        if (cover) {
          gsap.set(cover, {
            opacity: 0,
            y: 40,
            scale: 0.985,
          });
        }

        if (coverImage) {
          gsap.set(coverImage, {
            scale: 1.06,
          });
        }

        if (contentBlocks.length > 0) {
          gsap.set(contentBlocks, {
            opacity: 0,
            y: 30,
          });
        }

        /*
         * ============================================================
         * HEADER INTRO
         * ============================================================
         */

        const headerTimeline = gsap.timeline({
          defaults: {
            ease: "power3.out",
          },
          scrollTrigger: {
            trigger: page,
            start: "top top",
            end: "top+=220 top",
            toggleActions: "play none none none",
          },
        });

        if (back) {
          headerTimeline.to(back, {
            opacity: 1,
            y: 0,
            duration: 0.6,
          });
        }

        if (category) {
          headerTimeline.to(
            category,
            {
              opacity: 1,
              y: 0,
              duration: 0.55,
            },
            "-=0.3"
          );
        }

        if (title) {
          headerTimeline.to(
            title,
            {
              opacity: 1,
              y: 0,
              duration: 0.85,
              ease: "power4.out",
            },
            "-=0.2"
          );
        }

        if (excerpt) {
          headerTimeline.to(
            excerpt,
            {
              opacity: 1,
              y: 0,
              duration: 0.65,
            },
            "-=0.45"
          );
        }

        if (meta) {
          headerTimeline.to(
            meta,
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
            },
            "-=0.35"
          );
        }

        /*
         * ============================================================
         * COVER
         * ============================================================
         */

        if (cover) {
          const coverTimeline = gsap.timeline({
            defaults: {
              ease: "power3.out",
            },
            scrollTrigger: {
              trigger: cover,
              start: "top 82%",
              end: "bottom 18%",
              toggleActions: "play none none none",
            },
          });

          coverTimeline.to(cover, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
          });

          if (coverImage) {
            coverTimeline.to(
              coverImage,
              {
                scale: 1,
                duration: 1.4,
                ease: "power3.out",
              },
              "-=0.85"
            );

            gsap.to(coverImage, {
              yPercent: -4,
              ease: "none",
              scrollTrigger: {
                trigger: cover,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            });
          }
        }

        /*
         * ============================================================
         * ARTICLE CONTENT
         * ============================================================
         */

        if (articleContent && contentBlocks.length > 0) {
          const contentTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: articleContent,
              start: "top 82%",
              end: "bottom 25%",
              toggleActions: "play none none none",
            },
          });

          contentTimeline.to(contentBlocks, {
            opacity: 1,
            y: 0,
            duration: 0.65,
            stagger: 0.09,
            ease: "power3.out",
          });
        }

        /*
         * ============================================================
         * FOOTER CTA
         * ============================================================
         */

        if (footerCta) {
          const footerTimeline = gsap.timeline({
            defaults: {
              ease: "power3.out",
            },
            scrollTrigger: {
              trigger: footerCta,
              start: "top 82%",
              end: "bottom 20%",
              toggleActions: "play none none none",
            },
          });

          if (footerLabel) {
            footerTimeline.to(footerLabel, {
              opacity: 1,
              y: 0,
              duration: 0.55,
            });
          }

          if (footerTitle) {
            footerTimeline.to(
              footerTitle,
              {
                opacity: 1,
                y: 0,
                duration: 0.65,
              },
              "-=0.3"
            );
          }

          if (footerButton) {
            footerTimeline.to(
              footerButton,
              {
                opacity: 1,
                y: 0,
                duration: 0.6,
              },
              "-=0.35"
            );
          }
        }

        /*
         * ============================================================
         * REFRESH
         * ============================================================
         */

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