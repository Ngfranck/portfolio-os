"use client";

import { useRef, useState } from "react";

import { HugeiconsIcon } from "@hugeicons/react";
import {
  ArrowUpRight01Icon,
  Mail01Icon,
  SparklesIcon,
} from "@hugeicons/core-free-icons";

import { createContactMessage } from "../../(public)/contact/actions";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type ContactSettings = {
  contactEmail: string | null;
  contactPhone: string | null;
  whatsappUrl: string | null;
  location: string | null;
  isAvailableForProjects: boolean;
  linkedinUrl: string | null;
  behanceUrl: string | null;
  dribbbleUrl: string | null;
  githubUrl: string | null;
  instagramUrl: string | null;
};

export function ContactSection({
  settings,
}: {
  settings: ContactSettings;
}) {
  const sectionRef = useRef<HTMLElement>(null);

  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    setSuccessMessage("");
    setErrorMessage("");
  }

  async function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setSuccessMessage("");
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const result = await createContactMessage(formData);

      if (result.success) {
        setSuccessMessage(result.message);

        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        });
      } else {
        setErrorMessage(result.error);
      }
    } catch {
      setErrorMessage(
        "Une erreur inattendue est survenue. Veuillez réessayer ou me contacter directement par email."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  useGSAP(
    () => {
      const section = sectionRef.current;

      if (!section) return;

      if (
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ) {
        return;
      }

      const ctx = gsap.context(() => {
        const badge = section.querySelector("[data-contact-badge]");
        const title = section.querySelector("[data-contact-title]");
        const description = section.querySelector(
          "[data-contact-description]"
        );
        const cta = section.querySelector("[data-contact-cta]");

        const availabilityCard = section.querySelector(
          "[data-contact-availability]"
        );
        const availabilityContent = section.querySelector(
          "[data-contact-availability-content]"
        );

        const contactForm = section.querySelector(
          "[data-contact-form]"
        );

        const contactLinks = section.querySelector(
          "[data-contact-links]"
        );
        const contactItems = Array.from(
          section.querySelectorAll("[data-contact-item]")
        );

        const footerLine = section.querySelector(
          "[data-contact-footer]"
        );
        const footerMessage = section.querySelector(
          "[data-contact-footer-message]"
        );

        /*
         * =====================================================
         * INITIAL STATES
         * =====================================================
         */

        gsap.set(
          [
            badge,
            description,
            cta,
            availabilityContent,
            contactForm,
            footerLine,
            footerMessage,
          ].filter(Boolean),
          {
            opacity: 0,
          }
        );

        gsap.set(
          [badge, description, availabilityContent, footerLine].filter(
            Boolean
          ),
          {
            y: 24,
          }
        );

        if (title) {
          gsap.set(title, {
            opacity: 0,
            y: 45,
          });
        }

        if (cta) {
          gsap.set(cta, {
            y: 24,
            scale: 0.97,
          });
        }

        if (availabilityCard) {
          gsap.set(availabilityCard, {
            opacity: 0,
            x: 35,
            y: 20,
          });
        }

        if (contactForm) {
          gsap.set(contactForm, {
            y: 20,
          });
        }

        if (contactLinks) {
          gsap.set(contactLinks, {
            opacity: 0,
            x: 35,
            y: 20,
          });
        }

        if (contactItems.length) {
          gsap.set(contactItems, {
            opacity: 0,
            x: 25,
          });
        }

        if (footerMessage) {
          gsap.set(footerMessage, {
            x: -20,
          });
        }

        /*
         * =====================================================
         * INTRO
         * =====================================================
         */

        if (badge && title && description && cta) {
          const introTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top 78%",
              toggleActions: "play reverse play reverse",
            },
          });

          introTimeline
            .to(badge, {
              opacity: 1,
              y: 0,
              duration: 0.55,
              ease: "power3.out",
            })
            .to(
              title,
              {
                opacity: 1,
                y: 0,
                duration: 0.85,
                ease: "power3.out",
              },
              "-=0.25"
            )
            .to(
              description,
              {
                opacity: 1,
                y: 0,
                duration: 0.65,
                ease: "power3.out",
              },
              "-=0.4"
            )
            .to(
              cta,
              {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.6,
                ease: "power3.out",
              },
              "-=0.3"
            );
        }

        /*
         * =====================================================
         * AVAILABILITY
         * =====================================================
         */

        if (availabilityCard && availabilityContent) {
          const availabilityTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: availabilityCard,
              start: "top 82%",
              toggleActions: "play reverse play reverse",
            },
          });

          availabilityTimeline
            .to(availabilityCard, {
              opacity: 1,
              x: 0,
              y: 0,
              duration: 0.75,
              ease: "power3.out",
            })
            .to(
              availabilityContent,
              {
                opacity: 1,
                y: 0,
                duration: 0.55,
                ease: "power3.out",
              },
              "-=0.4"
            );
        }

        /*
         * =====================================================
         * CONTACT FORM
         * =====================================================
         */

        if (contactForm) {
          gsap.to(contactForm, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: {
              trigger: contactForm,
              start: "top 88%",
              toggleActions: "play reverse play reverse",
            },
          });
        }

        /*
         * =====================================================
         * CONTACT LINKS
         * =====================================================
         */

        if (contactLinks && contactItems.length) {
          const linksTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: contactLinks,
              start: "top 86%",
              toggleActions: "play reverse play reverse",
            },
          });

          linksTimeline
            .to(contactLinks, {
              opacity: 1,
              x: 0,
              y: 0,
              duration: 0.65,
              ease: "power3.out",
            })
            .to(
              contactItems,
              {
                opacity: 1,
                x: 0,
                duration: 0.55,
                stagger: 0.1,
                ease: "power3.out",
              },
              "-=0.3"
            );
        }

        /*
         * =====================================================
         * FOOTER
         * =====================================================
         */

        if (footerLine && footerMessage) {
          const footerTimeline = gsap.timeline({
            scrollTrigger: {
              trigger: footerLine,
              start: "top 90%",
              toggleActions: "play reverse play reverse",
            },
          });

          footerTimeline
            .to(footerLine, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power3.out",
            })
            .to(
              footerMessage,
              {
                opacity: 1,
                x: 0,
                duration: 0.5,
                ease: "power3.out",
              },
              "-=0.3"
            );
        }

        requestAnimationFrame(() => {
          ScrollTrigger.refresh();
        });
      }, sectionRef);

      return () => {
        ctx.revert();
      };
    },
    {
      scope: sectionRef,
    }
  );

  const fieldClassName = `
    w-full
    rounded-[var(--portfolio-radius-md)]
    border
    border-[var(--portfolio-border)]
    bg-[var(--portfolio-background)]
    px-4
    py-3.5
    font-body
    text-sm
    text-[var(--portfolio-text-primary)]
    outline-none
    transition-colors
    duration-[var(--portfolio-motion-fast)]
    placeholder:text-[var(--portfolio-text-muted)]
    focus:border-[var(--portfolio-text-primary)]
    focus-visible:ring-2
    focus-visible:ring-[var(--portfolio-accent)]
    focus-visible:ring-offset-2
  `;

  const labelClassName = `
    mb-2
    block
    font-display
    text-[12px]
    font-medium
    tracking-[-0.01em]
    text-[var(--portfolio-text-primary)]
  `;

  const isAvailable = settings.isAvailableForProjects;

  return (
    <section
      ref={sectionRef}
      id="contact"
      aria-labelledby="contact-title"
      className="
        relative
        overflow-hidden
        bg-[var(--portfolio-surface)]
        px-4
        py-[var(--portfolio-space-7)]
        text-[var(--portfolio-text-primary)]
        transition-colors
        duration-[var(--portfolio-motion-normal)]
        sm:px-6
        lg:px-8
      "
    >
      <div className="relative mx-auto max-w-[1320px]">
        <div
          className="
            grid
            grid-cols-1
            gap-12
            lg:grid-cols-[1.1fr_0.9fr]
            lg:gap-20
          "
        >
          {/* =================================================
              LEFT — INTRO
          ================================================= */}

          <div>
            {/* BADGE */}

            <div
              data-contact-badge
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-[var(--portfolio-border)]
                bg-[var(--portfolio-surface)]
                px-3
                py-2
                font-display
                text-[12px]
                font-medium
                tracking-[-0.01em]
                text-[var(--portfolio-text-primary)]
                shadow-[0_3px_12px_rgba(0,0,0,0.025)]
                backdrop-blur-md
                transition-colors
                duration-[var(--portfolio-motion-normal)]
                dark:shadow-none
              "
            >
              <span
                className="
                  relative
                  flex
                  h-[7px]
                  w-[7px]
                  items-center
                  justify-center
                "
                aria-hidden="true"
              >
                <span
                  className={`
                    contact-pulse
                    absolute
                    h-[7px]
                    w-[7px]
                    rounded-full
                    ${
                      isAvailable
                        ? "bg-[var(--portfolio-accent-green)]"
                        : "bg-[var(--portfolio-text-muted)]"
                    }
                  `}
                />

                <span
                  className={`
                    relative
                    h-[5px]
                    w-[5px]
                    rounded-full
                    ${
                      isAvailable
                        ? "bg-[var(--portfolio-accent-green)]"
                        : "bg-[var(--portfolio-text-muted)]"
                    }
                  `}
                />
              </span>

              <span>
                {isAvailable
                  ? "Disponible pour de nouveaux projets"
                  : "Actuellement indisponible"}
              </span>
            </div>

            {/* TITLE */}

            <h2
              id="contact-title"
              data-contact-title
              className="
                mt-7
                max-w-[850px]
                font-display
                text-[clamp(3.2rem,7vw,7rem)]
                font-semibold
                leading-[0.9]
                tracking-[var(--portfolio-tracking-display)]
              "
            >
              <span className="text-[var(--portfolio-text-primary)]">
                Un projet en
              </span>

              <br />

              <span
                className="
                  font-normal
                  text-[var(--portfolio-text-muted)]
                "
              >
                tête ?
              </span>
            </h2>

            {/* DESCRIPTION */}

            <p
              data-contact-description
              className="
                mt-7
                max-w-[560px]
                font-body
                text-[var(--portfolio-text-body)]
                leading-[var(--portfolio-leading-body)]
                tracking-[var(--portfolio-tracking-body)]
                text-[var(--portfolio-text-secondary)]
              "
            >
              Vous avez une idée, un projet ou simplement
              l&apos;envie d&apos;échanger ? Parlons-en et voyons
              comment transformer votre vision en une
              expérience digitale claire, élégante et
              mémorable.
            </p>

            {/* CTA */}

            <div className="mt-8">
              {settings.contactEmail && (
                <a
                  data-contact-cta
                  data-cursor="magnetic"
                  href={`mailto:${settings.contactEmail}`}
                  aria-label={`Envoyer un email à ${settings.contactEmail}`}
                  className="
                    group
                    inline-flex
                    h-12
                    items-center
                    gap-2.5
                    rounded-full
                    bg-[var(--portfolio-text-primary)]
                    px-6
                    font-display
                    text-[13px]
                    font-medium
                    tracking-[-0.01em]
                    text-[var(--portfolio-background)]
                    transition-all
                    duration-[var(--portfolio-motion-fast)]
                    hover:-translate-y-[1px]
                    hover:shadow-[0_12px_30px_rgba(0,0,0,0.12)]
                    focus-visible:outline-none
                    focus-visible:ring-2
                    focus-visible:ring-[var(--portfolio-accent)]
                    focus-visible:ring-offset-2
                    dark:hover:shadow-[0_12px_30px_rgba(0,0,0,0.25)]
                  "
                >
                  <HugeiconsIcon
                    icon={Mail01Icon}
                    size={16}
                    strokeWidth={1.7}
                    aria-hidden="true"
                  />

                  <span>Parlons de votre projet</span>

                  <HugeiconsIcon
                    icon={ArrowUpRight01Icon}
                    size={15}
                    strokeWidth={1.7}
                    aria-hidden="true"
                    className="
                      text-[var(--portfolio-accent)]
                      transition-transform
                      duration-[var(--portfolio-motion-fast)]
                      group-hover:-translate-y-[1px]
                      group-hover:translate-x-[1px]
                    "
                  />
                </a>
              )}
            </div>
          </div>

          {/* =================================================
              RIGHT — CONTACT FORM AND INFORMATION
          ================================================= */}

          <div className="flex flex-col justify-end">
            {/* AVAILABILITY */}

            <div
              data-contact-availability
              className="
                rounded-[var(--portfolio-radius-lg)]
                border
                border-[var(--portfolio-border)]
                bg-[var(--portfolio-surface)]
                p-6
                shadow-[0_8px_30px_rgba(0,0,0,0.025)]
                backdrop-blur-md
                transition-colors
                duration-[var(--portfolio-motion-normal)]
                dark:shadow-none
              "
            >
              <div
                data-contact-availability-content
                className="flex items-center justify-between gap-4"
              >
                <div
                  className="
                    flex
                    items-center
                    gap-2.5
                    font-display
                    text-[14px]
                    font-semibold
                    tracking-[-0.015em]
                    text-[var(--portfolio-text-primary)]
                  "
                >
                  <span className="relative flex h-2 w-2" aria-hidden="true">
                    <span
                      className={`
                        absolute
                        inset-0
                        rounded-full
                        opacity-30
                        ${
                          isAvailable
                            ? "animate-ping bg-[var(--portfolio-accent-green)]"
                            : "bg-[var(--portfolio-text-muted)]"
                        }
                      `}
                    />

                    <span
                      className={`
                        relative
                        h-2
                        w-2
                        rounded-full
                        ${
                          isAvailable
                            ? "bg-[var(--portfolio-accent-green)]"
                            : "bg-[var(--portfolio-text-muted)]"
                        }
                      `}
                    />
                  </span>

                  {isAvailable
                    ? "Disponible pour de nouveaux projets"
                    : "Actuellement indisponible"}
                </div>

                <HugeiconsIcon
                  icon={SparklesIcon}
                  size={18}
                  strokeWidth={1.5}
                  aria-hidden="true"
                  className="text-[var(--portfolio-accent)]"
                />
              </div>

              <p
                className="
                  mt-3
                  max-w-[420px]
                  font-body
                  text-[13px]
                  leading-[1.55]
                  text-[var(--portfolio-text-secondary)]
                "
              >
                {isAvailable
                  ? "Je suis actuellement disponible pour accompagner de nouveaux projets et collaborations."
                  : "Je ne suis actuellement pas disponible pour de nouveaux projets, mais vous pouvez tout de même me laisser un message."}
              </p>
            </div>

            {/* CONTACT FORM */}

            <form
              data-contact-form
              onSubmit={handleSubmit}
              aria-label="Formulaire de contact"
              className="
                mt-6
                space-y-5
                rounded-[var(--portfolio-radius-lg)]
                border
                border-[var(--portfolio-border)]
                bg-[var(--portfolio-surface)]
                p-5
                sm:p-6
              "
            >
              <div>
                <h3
                  className="
                    font-display
                    text-xl
                    font-semibold
                    tracking-[-0.03em]
                  "
                >
                  Envoyez-moi un message
                </h3>

                <p
                  className="
                    mt-2
                    font-body
                    text-[13px]
                    leading-relaxed
                    text-[var(--portfolio-text-secondary)]
                  "
                >
                  Présentez-moi votre projet et vos besoins.
                </p>
              </div>

              {/* NAME */}

              <div>
                <label
                  htmlFor="contact-name"
                  className={labelClassName}
                >
                  Nom
                </label>

                <input
                  id="contact-name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  minLength={2}
                  maxLength={100}
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Votre nom complet"
                  className={fieldClassName}
                />
              </div>

              {/* EMAIL */}

              <div>
                <label
                  htmlFor="contact-email"
                  className={labelClassName}
                >
                  Email
                </label>

                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  maxLength={254}
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="vous@exemple.com"
                  className={fieldClassName}
                />
              </div>

              {/* SUBJECT */}

              <div>
                <label
                  htmlFor="contact-subject"
                  className={labelClassName}
                >
                  Sujet
                </label>

                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  required
                  minLength={3}
                  maxLength={150}
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="Quel est votre projet ?"
                  className={fieldClassName}
                />
              </div>

              {/* MESSAGE */}

              <div>
                <label
                  htmlFor="contact-message"
                  className={labelClassName}
                >
                  Message
                </label>

                <textarea
                  id="contact-message"
                  name="message"
                  required
                  minLength={10}
                  maxLength={5000}
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Décrivez votre projet, vos objectifs et vos besoins..."
                  className={`${fieldClassName} min-h-[140px] resize-y`}
                />
              </div>

              {/* ERROR MESSAGE */}

              {errorMessage && (
                <p
                  role="alert"
                  className="
                    rounded-[var(--portfolio-radius-md)]
                    border
                    border-[var(--portfolio-border)]
                    px-4
                    py-3
                    text-sm
                    leading-relaxed
                    text-[var(--portfolio-text-secondary)]
                  "
                >
                  {errorMessage}
                </p>
              )}

              {/* SUCCESS MESSAGE */}

              {successMessage && (
                <p
                  role="status"
                  className="
                    rounded-[var(--portfolio-radius-md)]
                    border
                    border-[var(--portfolio-border)]
                    px-4
                    py-3
                    text-sm
                    leading-relaxed
                    text-[var(--portfolio-text-primary)]
                  "
                >
                  {successMessage}
                </p>
              )}

              {/* SUBMIT */}

              <button
                type="submit"
                disabled={isSubmitting}
                className="
                  group
                  inline-flex
                  min-h-12
                  w-full
                  items-center
                  justify-center
                  gap-3
                  rounded-full
                  border
                  border-[var(--portfolio-border)]
                  px-5
                  py-3
                  font-display
                  text-[13px]
                  font-medium
                  text-[var(--portfolio-text-primary)]
                  transition-all
                  duration-[var(--portfolio-motion-fast)]
                  hover:-translate-y-[1px]
                  hover:bg-black/[0.025]
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[var(--portfolio-accent)]
                  focus-visible:ring-offset-2
                  disabled:cursor-not-allowed
                  disabled:opacity-50
                  dark:hover:bg-white/[0.04]
                "
              >
                <span>
                  {isSubmitting
                    ? "Envoi en cours..."
                    : "Envoyer le message"}
                </span>

                <HugeiconsIcon
                  icon={ArrowUpRight01Icon}
                  size={16}
                  strokeWidth={1.7}
                  aria-hidden="true"
                  className="
                    text-[var(--portfolio-accent)]
                    transition-transform
                    duration-[var(--portfolio-motion-fast)]
                    group-hover:-translate-y-[1px]
                    group-hover:translate-x-[1px]
                  "
                />
              </button>

              <p
                className="
                  font-body
                  text-[11px]
                  leading-relaxed
                  text-[var(--portfolio-text-muted)]
                "
              >
                Vos informations sont utilisées uniquement
                pour répondre à votre demande.
              </p>
            </form>

            {/* CONTACT LINKS */}

            {(settings.contactEmail ||
              settings.whatsappUrl ||
              settings.linkedinUrl) && (
              <div
                data-contact-links
                className="
                  mt-4
                  overflow-hidden
                  rounded-[var(--portfolio-radius-lg)]
                  border
                  border-[var(--portfolio-border)]
                  bg-[var(--portfolio-surface)]
                  backdrop-blur-md
                "
              >
                {/* EMAIL */}

                {settings.contactEmail && (
                  <a
                    data-contact-item
                    data-cursor="magnetic"
                    href={`mailto:${settings.contactEmail}`}
                    aria-label={`Envoyer un email à ${settings.contactEmail}`}
                    className="
                      group
                      flex
                      items-center
                      justify-between
                      gap-4
                      border-b
                      border-[var(--portfolio-border)]
                      p-5
                      transition-colors
                      duration-[var(--portfolio-motion-fast)]
                      hover:bg-black/[0.025]
                      focus-visible:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-inset
                      focus-visible:ring-[var(--portfolio-accent)]
                      dark:hover:bg-white/[0.04]
                    "
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="
                          flex
                          h-10
                          w-10
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          border
                          border-[var(--portfolio-border)]
                          bg-[var(--portfolio-background)]
                        "
                        aria-hidden="true"
                      >
                        <HugeiconsIcon
                          icon={Mail01Icon}
                          size={17}
                          strokeWidth={1.6}
                        />
                      </div>

                      <div>
                        <span
                          className="
                            block
                            font-display
                            text-[12px]
                            font-medium
                            text-[var(--portfolio-text-muted)]
                          "
                        >
                          Email
                        </span>

                        <span
                          className="
                            mt-1
                            block
                            font-display
                            text-[14px]
                            font-medium
                            text-[var(--portfolio-text-primary)]
                          "
                        >
                          {settings.contactEmail}
                        </span>
                      </div>
                    </div>

                    <HugeiconsIcon
                      icon={ArrowUpRight01Icon}
                      size={17}
                      strokeWidth={1.5}
                      aria-hidden="true"
                      className="
                        shrink-0
                        text-[var(--portfolio-text-muted)]
                        transition-all
                        duration-[var(--portfolio-motion-fast)]
                        group-hover:translate-x-1
                        group-hover:-translate-y-1
                        group-hover:text-[var(--portfolio-accent)]
                      "
                    />
                  </a>
                )}

                {/* WHATSAPP */}

                {settings.whatsappUrl && (
                  <a
                    data-contact-item
                    data-cursor="magnetic"
                    href={settings.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Contacter Gonar.ui sur WhatsApp"
                    className="
                      group
                      flex
                      items-center
                      justify-between
                      gap-4
                      border-b
                      border-[var(--portfolio-border)]
                      p-5
                      transition-colors
                      duration-[var(--portfolio-motion-fast)]
                      hover:bg-black/[0.025]
                      focus-visible:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-inset
                      focus-visible:ring-[var(--portfolio-accent)]
                      dark:hover:bg-white/[0.04]
                    "
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="
                          flex
                          h-10
                          w-10
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          border
                          border-[var(--portfolio-border)]
                          bg-[var(--portfolio-background)]
                          font-display
                          text-[11px]
                          font-semibold
                        "
                        aria-hidden="true"
                      >
                        WA
                      </div>

                      <div>
                        <span
                          className="
                            block
                            font-display
                            text-[12px]
                            font-medium
                            text-[var(--portfolio-text-muted)]
                          "
                        >
                          WhatsApp
                        </span>

                        <span
                          className="
                            mt-1
                            block
                            font-display
                            text-[14px]
                            font-medium
                            text-[var(--portfolio-text-primary)]
                          "
                        >
                          Échanger avec moi
                        </span>
                      </div>
                    </div>

                    <HugeiconsIcon
                      icon={ArrowUpRight01Icon}
                      size={17}
                      strokeWidth={1.5}
                      aria-hidden="true"
                      className="
                        shrink-0
                        text-[var(--portfolio-text-muted)]
                        transition-all
                        duration-[var(--portfolio-motion-fast)]
                        group-hover:translate-x-1
                        group-hover:-translate-y-1
                        group-hover:text-[var(--portfolio-accent)]
                      "
                    />
                  </a>
                )}

                {/* LINKEDIN */}

                {settings.linkedinUrl && (
                  <a
                    data-contact-item
                    data-cursor="magnetic"
                    href={settings.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Voir le profil LinkedIn de Gonar.ui"
                    className="
                      group
                      flex
                      items-center
                      justify-between
                      gap-4
                      p-5
                      transition-colors
                      duration-[var(--portfolio-motion-fast)]
                      hover:bg-black/[0.025]
                      focus-visible:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-inset
                      focus-visible:ring-[var(--portfolio-accent)]
                      dark:hover:bg-white/[0.04]
                    "
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="
                          flex
                          h-10
                          w-10
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          border
                          border-[var(--portfolio-border)]
                          bg-[var(--portfolio-background)]
                          font-display
                          text-[11px]
                          font-semibold
                        "
                        aria-hidden="true"
                      >
                        in
                      </div>

                      <div>
                        <span
                          className="
                            block
                            font-display
                            text-[12px]
                            font-medium
                            text-[var(--portfolio-text-muted)]
                          "
                        >
                          LinkedIn
                        </span>

                        <span
                          className="
                            mt-1
                            block
                            font-display
                            text-[14px]
                            font-medium
                            text-[var(--portfolio-text-primary)]
                          "
                        >
                          Me retrouver sur LinkedIn
                        </span>
                      </div>
                    </div>

                    <HugeiconsIcon
                      icon={ArrowUpRight01Icon}
                      size={17}
                      strokeWidth={1.5}
                      aria-hidden="true"
                      className="
                        shrink-0
                        text-[var(--portfolio-text-muted)]
                        transition-all
                        duration-[var(--portfolio-motion-fast)]
                        group-hover:translate-x-1
                        group-hover:-translate-y-1
                        group-hover:text-[var(--portfolio-accent)]
                      "
                    />
                  </a>
                )}
              </div>
            )}
          </div>
        </div>

        {/* ===================================================
            FOOTER — WITHOUT BACK TO TOP
        =================================================== */}

        <div
          data-contact-footer
          className="
            mt-20
            flex
            flex-col
            gap-5
            border-t
            border-[var(--portfolio-border)]
            pt-7
            sm:flex-row
            sm:items-center
            sm:justify-between
          "
        >
          <div
            data-contact-footer-message
            className="
              flex
              items-center
              gap-2.5
              font-display
              text-[13px]
              font-medium
              text-[var(--portfolio-text-secondary)]
            "
          >
            <HugeiconsIcon
              icon={SparklesIcon}
              size={15}
              strokeWidth={1.5}
              aria-hidden="true"
              className="text-[var(--portfolio-accent)]"
            />

            <span>
              The right design for the right problem.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}