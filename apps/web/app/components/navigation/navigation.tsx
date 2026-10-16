"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowUpRight01Icon,
  Moon01Icon,
  Sun03Icon,
  Menu01Icon,
  Cancel01Icon,
} from "@hugeicons/core-free-icons";

import { useTheme } from "../../components/theme/theme-provider";

const navigationItems = [
  {
    label: "Projects",
    href: "/#projects",
  },
  {
    label: "Services",
    href: "/#services",
  },
  {
    label: "About",
    href: "/#about",
  },
  {
    label: "Testimonials",
    href: "/#testimonials",
  },
  {
    label: "Articles",
    href: "/articles",
  },
];

export function Navigation() {
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  const darkMode = theme === "dark";

  const closeMobileMenu = () => {
    setMobileOpen(false);
  };

  /**
   * Ferme automatiquement le menu mobile lorsque
   * l'utilisateur repasse sur desktop.
   */
  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");

    const handleChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setMobileOpen(false);
      }
    };

    mediaQuery.addEventListener("change", handleChange);

    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  /**
   * Permet de fermer le menu avec Escape.
   */
  useEffect(() => {
    if (!mobileOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileOpen(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [mobileOpen]);

  /**
   * Empêche le scroll de la page lorsque le menu mobile
   * est ouvert.
   */
  useEffect(() => {
    if (!mobileOpen) {
      document.body.style.removeProperty("overflow");
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.removeProperty("overflow");
    };
  }, [mobileOpen]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6 sm:pt-5">
      {/* =====================================================
          DESKTOP NAVIGATION
          ===================================================== */}

      <nav
        aria-label="Navigation principale"
        className={`
          relative mx-auto hidden h-[70px] w-full max-w-[760px]
          items-center overflow-hidden rounded-full border px-4
          backdrop-blur-[22px] backdrop-saturate-[150%]
          transition-all duration-[var(--portfolio-motion-normal)]
          md:flex
          ${
            darkMode
              ? `
                border-white/[0.08]
                bg-[#181818]/[0.78]
                shadow-[0_12px_40px_rgba(0,0,0,0.22)]
              `
              : `
                border-black/[0.055]
                bg-white/[0.76]
                shadow-[0_12px_40px_rgba(0,0,0,0.055)]
              `
          }
        `}
      >
        <div className="relative z-10 flex w-full items-center">
          {/* LOGO */}

          <a
            href="/"
            aria-label="Retour à l'accueil"
            data-cursor="magnetic"
            className="
              flex shrink-0 items-center
              transition-opacity
              duration-[var(--portfolio-motion-fast)]
              hover:opacity-70
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[var(--portfolio-accent)]
              focus-visible:ring-offset-2
              focus-visible:ring-offset-transparent
            "
          >
            <Image
              src="/images/logo/logo.svg"
              alt="Gonar.ui"
              width={120}
              height={40}
              priority
              className={`
                h-auto w-[78px]
                transition-all
                duration-[var(--portfolio-motion-normal)]
                ${darkMode ? "brightness-0 invert" : ""}
              `}
            />
          </a>

          {/* NAVIGATION */}

          <div className="ml-auto flex items-center">
            <div className="flex items-center gap-7">
              {navigationItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  data-cursor="magnetic"
                  className={`
                    group relative flex h-10 items-center
                    font-display text-[13px] font-medium
                    tracking-[-0.01em]
                    transition-colors
                    duration-[var(--portfolio-motion-fast)]
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-[var(--portfolio-accent)]
                    focus-visible:ring-offset-2
                    focus-visible:ring-offset-transparent
                    ${
                      darkMode
                        ? "text-white/55 hover:text-white"
                        : "text-[var(--portfolio-text-secondary)] hover:text-[var(--portfolio-text-primary)]"
                    }
                  `}
                >
                  {item.label}

                  {/* POINT HOVER */}

                  <span
                    aria-hidden="true"
                    className={`
                      absolute bottom-[3px] left-1/2
                      h-[3px] w-[3px]
                      -translate-x-1/2 scale-0
                      rounded-full
                      transition-transform
                      duration-[var(--portfolio-motion-fast)]
                      ease-out
                      group-hover:scale-100
                      ${
                        darkMode
                          ? "bg-white"
                          : "bg-[var(--portfolio-text-primary)]"
                      }
                    `}
                  />
                </a>
              ))}
            </div>

            {/* SEPARATEUR */}

            <span
              aria-hidden="true"
              className={`
                mx-4 h-6 w-px
                ${
                  darkMode
                    ? "bg-white/10"
                    : "bg-[var(--portfolio-border)]"
                }
              `}
            />

            {/* CONTACT */}

            <a
              href="/#contact"
              data-cursor="magnetic"
              className="
                group flex h-[44px] items-center gap-2
                rounded-full
                bg-[var(--portfolio-dark)]
                px-[17px]
                font-display text-[13px] font-medium
                tracking-[-0.01em]
                text-[var(--portfolio-dark-text)]
                transition-all
                duration-[var(--portfolio-motion-fast)]
                hover:scale-[1.02]
                hover:shadow-[0_5px_18px_rgba(0,0,0,0.12)]
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[var(--portfolio-accent)]
                focus-visible:ring-offset-2
                focus-visible:ring-offset-transparent
              "
            >
              <span>Contact</span>

              <HugeiconsIcon
                icon={ArrowUpRight01Icon}
                size={15}
                strokeWidth={1.8}
                color="var(--portfolio-accent)"
                aria-hidden="true"
                className="
                  transition-transform
                  duration-[var(--portfolio-motion-fast)]
                  group-hover:-translate-y-[1px]
                  group-hover:translate-x-[1px]
                "
              />
            </a>

            {/* THEME */}

            <button
              type="button"
              aria-label={
                darkMode
                  ? "Activer le mode clair"
                  : "Activer le mode sombre"
              }
              aria-pressed={darkMode}
              onClick={toggleTheme}
              data-cursor="magnetic"
              className={`
                ml-2 flex h-[44px] w-[44px] shrink-0
                items-center justify-center rounded-full
                transition-all
                duration-[var(--portfolio-motion-fast)]
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[var(--portfolio-accent)]
                ${
                  darkMode
                    ? "text-white/75 hover:bg-white/[0.07] hover:text-white"
                    : "text-[var(--portfolio-text-secondary)] hover:bg-black/[0.045] hover:text-[var(--portfolio-text-primary)]"
                }
              `}
            >
              <HugeiconsIcon
                icon={darkMode ? Sun03Icon : Moon01Icon}
                size={18}
                strokeWidth={1.6}
                aria-hidden="true"
              />
            </button>
          </div>
        </div>
      </nav>

      {/* =====================================================
          MOBILE NAVIGATION
          ===================================================== */}

      <nav
        aria-label="Navigation mobile"
        className={`
          relative mx-auto w-full max-w-[760px]
          overflow-hidden rounded-[28px] border
          backdrop-blur-[22px] backdrop-saturate-[150%]
          transition-all
          duration-[var(--portfolio-motion-normal)]
          md:hidden
          ${
            darkMode
              ? `
                border-white/[0.08]
                bg-[#181818]/[0.82]
                shadow-[0_12px_40px_rgba(0,0,0,0.22)]
              `
              : `
                border-black/[0.055]
                bg-white/[0.82]
                shadow-[0_12px_40px_rgba(0,0,0,0.055)]
              `
          }
        `}
      >
        {/* MOBILE HEADER */}

        <div className="relative z-10 flex h-[64px] items-center px-4">
          {/* LOGO */}

          <a
            href="/"
            aria-label="Retour à l'accueil"
            onClick={closeMobileMenu}
            data-cursor="magnetic"
            className="
              flex items-center
              transition-opacity
              duration-[var(--portfolio-motion-fast)]
              hover:opacity-70
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[var(--portfolio-accent)]
              focus-visible:ring-offset-2
            "
          >
            <Image
              src="/images/logo/logo.svg"
              alt="Gonar.ui"
              width={120}
              height={40}
              priority
              className={`
                h-auto w-[72px]
                transition-all
                duration-[var(--portfolio-motion-normal)]
                ${darkMode ? "brightness-0 invert" : ""}
              `}
            />
          </a>

          <div className="ml-auto flex items-center">
            {/* THEME */}

            <button
              type="button"
              aria-label={
                darkMode
                  ? "Activer le mode clair"
                  : "Activer le mode sombre"
              }
              aria-pressed={darkMode}
              onClick={toggleTheme}
              data-cursor="magnetic"
              className={`
                flex h-[40px] w-[40px]
                items-center justify-center
                rounded-full
                transition-colors
                duration-[var(--portfolio-motion-fast)]
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[var(--portfolio-accent)]
                ${
                  darkMode
                    ? "text-white/70 hover:bg-white/[0.07]"
                    : "text-[var(--portfolio-text-secondary)] hover:bg-black/[0.045]"
                }
              `}
            >
              <HugeiconsIcon
                icon={darkMode ? Sun03Icon : Moon01Icon}
                size={18}
                strokeWidth={1.6}
                aria-hidden="true"
              />
            </button>

            {/* MENU BUTTON */}

            <button
              type="button"
              aria-label={
                mobileOpen
                  ? "Fermer le menu"
                  : "Ouvrir le menu"
              }
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation-menu"
              onClick={() =>
                setMobileOpen((current) => !current)
              }
              data-cursor="magnetic"
              className={`
                flex h-[40px] w-[40px]
                items-center justify-center
                rounded-full
                transition-all
                duration-[var(--portfolio-motion-fast)]
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[var(--portfolio-accent)]
                ${
                  darkMode
                    ? "text-white hover:bg-white/[0.07]"
                    : "text-[var(--portfolio-text-primary)] hover:bg-black/[0.045]"
                }
              `}
            >
              <HugeiconsIcon
                icon={
                  mobileOpen
                    ? Cancel01Icon
                    : Menu01Icon
                }
                size={20}
                strokeWidth={1.7}
                aria-hidden="true"
              />
            </button>
          </div>
        </div>

        {/* MOBILE MENU */}

        <div
          id="mobile-navigation-menu"
          aria-hidden={!mobileOpen}
          className={`
            grid
            transition-[grid-template-rows,opacity]
            duration-[var(--portfolio-motion-normal)]
            ease-out
            ${
              mobileOpen
                ? "grid-rows-[1fr] opacity-100"
                : "grid-rows-[0fr] opacity-0"
            }
          `}
        >
          <div className="min-h-0 overflow-hidden">
            {/* SEPARATEUR */}

            <div
              className={`
                h-px w-full
                ${
                  darkMode
                    ? "bg-white/[0.08]"
                    : "bg-[var(--portfolio-border)]"
                }
              `}
            />

            {/* LINKS */}

            <div className="px-4 py-3">
              {navigationItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={closeMobileMenu}
                  data-cursor="magnetic"
                  className={`
                    group flex h-[52px] items-center
                    font-display text-[15px] font-medium
                    transition-colors
                    duration-[var(--portfolio-motion-fast)]
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-[var(--portfolio-accent)]
                    ${
                      darkMode
                        ? "text-white/65 hover:text-white"
                        : "text-[var(--portfolio-text-secondary)] hover:text-[var(--portfolio-text-primary)]"
                    }
                  `}
                >
                  <span>{item.label}</span>

                  {/* POINT */}

                  <span
                    aria-hidden="true"
                    className={`
                      ml-2 h-[3px] w-[3px]
                      scale-0 rounded-full
                      transition-transform
                      duration-[var(--portfolio-motion-fast)]
                      group-hover:scale-100
                      ${
                        darkMode
                          ? "bg-white"
                          : "bg-[var(--portfolio-text-primary)]"
                      }
                    `}
                  />
                </a>
              ))}
            </div>

            {/* CONTACT */}

            <div
              className={`
                border-t px-4 py-4
                ${
                  darkMode
                    ? "border-white/[0.08]"
                    : "border-[var(--portfolio-border)]"
                }
              `}
            >
              <a
                href="/#contact"
                onClick={closeMobileMenu}
                data-cursor="magnetic"
                className="
                  group flex h-[48px] w-full
                  items-center justify-center gap-2
                  rounded-full
                  bg-[var(--portfolio-dark)]
                  font-display text-[14px] font-medium
                  text-[var(--portfolio-dark-text)]
                  transition-all
                  duration-[var(--portfolio-motion-fast)]
                  hover:scale-[1.01]
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[var(--portfolio-accent)]
                  focus-visible:ring-offset-2
                "
              >
                <span>Contact</span>

                <HugeiconsIcon
                  icon={ArrowUpRight01Icon}
                  size={15}
                  strokeWidth={1.8}
                  color="var(--portfolio-accent)"
                  aria-hidden="true"
                  className="
                    transition-transform
                    duration-[var(--portfolio-motion-fast)]
                    group-hover:-translate-y-[1px]
                    group-hover:translate-x-[1px]
                  "
                />
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}