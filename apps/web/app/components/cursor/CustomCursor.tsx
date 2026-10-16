"use client";

import { useEffect, useRef } from "react";

import gsap from "gsap";

type CursorMode =
  | "default"
  | "view"
  | "open"
  | "drag"
  | "magnetic";

const INTERACTIVE_SELECTOR = [
  "a",
  "button",
  "[data-cursor]",
  "input",
  "textarea",
  "select",
].join(",");

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  const mouse = useRef({
    x: 0,
    y: 0,
  });

  const position = useRef({
    x: 0,
    y: 0,
  });

  const currentMode = useRef<CursorMode>("default");

  const magneticTarget = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const cursor = cursorRef.current;
    const dot = dotRef.current;
    const ring = ringRef.current;
    const label = labelRef.current;

    if (!cursor || !dot || !ring || !label) {
      return;
    }

    const isTouchDevice = window.matchMedia(
      "(hover: none), (pointer: coarse)"
    ).matches;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    /*
     * =====================================================
     * DISABLE ON TOUCH DEVICES
     * =====================================================
     */

    if (isTouchDevice) {
      return;
    }

    /*
     * =====================================================
     * INITIAL STATE
     * =====================================================
     */

    gsap.set(cursor, {
      opacity: 0,
    });

    gsap.set(dot, {
      xPercent: -50,
      yPercent: -50,
    });

    gsap.set(ring, {
      xPercent: -50,
      yPercent: -50,
      scale: 1,
    });

    /*
     * =====================================================
     * MAGNETIC RESET
     * =====================================================
     */

    const resetMagneticTarget = () => {
      const target = magneticTarget.current;

      if (!target) {
        return;
      }

      gsap.to(target, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: "elastic.out(1, 0.45)",
        overwrite: true,
      });

      magneticTarget.current = null;
    };

    /*
     * =====================================================
     * MAGNETIC TARGET
     * =====================================================
     */

    const setMagneticTarget = (
      element: HTMLElement | null
    ) => {
      if (
        magneticTarget.current &&
        magneticTarget.current !== element
      ) {
        resetMagneticTarget();
      }

      magneticTarget.current = element;
    };

    /*
     * =====================================================
     * MOUSE POSITION
     * =====================================================
     */

    const handleMouseMove = (event: MouseEvent) => {
      mouse.current.x = event.clientX;
      mouse.current.y = event.clientY;

      gsap.to(cursor, {
        opacity: 1,
        duration: 0.2,
        overwrite: true,
      });

      const target = magneticTarget.current;

      if (!target || prefersReducedMotion) {
        return;
      }

      const rect = target.getBoundingClientRect();

      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = event.clientX - centerX;
      const deltaY = event.clientY - centerY;

      const maxDistance = 18;

      const magneticX = Math.max(
        -maxDistance,
        Math.min(maxDistance, deltaX * 0.18)
      );

      const magneticY = Math.max(
        -maxDistance,
        Math.min(maxDistance, deltaY * 0.18)
      );

      gsap.to(target, {
        x: magneticX,
        y: magneticY,
        duration: 0.35,
        ease: "power3.out",
        overwrite: true,
      });
    };

    /*
     * =====================================================
     * MOUSE ENTER / LEAVE WINDOW
     * =====================================================
     */

    const handleMouseEnter = () => {
      gsap.to(cursor, {
        opacity: 1,
        duration: 0.25,
        overwrite: true,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(cursor, {
        opacity: 0,
        duration: 0.25,
        overwrite: true,
      });

      resetMagneticTarget();
    };

    /*
     * =====================================================
     * CURSOR LOOP
     * =====================================================
     */

    let animationFrame = 0;

    const render = () => {
      if (prefersReducedMotion) {
        position.current.x = mouse.current.x;
        position.current.y = mouse.current.y;
      } else {
        position.current.x +=
          (mouse.current.x - position.current.x) * 0.22;

        position.current.y +=
          (mouse.current.y - position.current.y) * 0.22;
      }

      gsap.set(dot, {
        x: position.current.x,
        y: position.current.y,
      });

      gsap.set(ring, {
        x: position.current.x,
        y: position.current.y,
      });

      animationFrame = requestAnimationFrame(render);
    };

    /*
     * =====================================================
     * CURSOR MODE
     * =====================================================
     */

    const setCursorMode = (
      mode: CursorMode,
      immediate = false
    ) => {
      if (
        currentMode.current === mode &&
        !immediate
      ) {
        return;
      }

      currentMode.current = mode;

      const isDefault = mode === "default";

      const modeConfig = {
        default: {
          scale: 1,
          label: "",
          dotScale: 1,
        },

        view: {
          scale: 1.65,
          label: "VIEW",
          dotScale: 0.45,
        },

        open: {
          scale: 1.65,
          label: "OPEN ↗",
          dotScale: 0.45,
        },

        drag: {
          scale: 1.65,
          label: "DRAG",
          dotScale: 0.45,
        },

        magnetic: {
          scale: 1.65,
          label: "VIEW",
          dotScale: 0.45,
        },
      };

      const config = modeConfig[mode];

      /*
       * Ring scale
       */

      gsap.to(ring, {
        scale: config.scale,
        duration: immediate ? 0 : 0.4,
        ease: "power3.out",
        overwrite: true,
      });

      /*
       * Center dot
       */

      gsap.to(dot, {
        scale: config.dotScale,
        duration: immediate ? 0 : 0.3,
        ease: "power3.out",
        overwrite: true,
      });

      /*
       * Label
       */

      gsap.to(label, {
        opacity: isDefault ? 0 : 1,
        scale: isDefault ? 0.8 : 1,
        duration: immediate ? 0 : 0.3,
        ease: "power3.out",
        overwrite: true,
      });
    };

    /*
     * =====================================================
     * INTERACTION DETECTION
     * =====================================================
     */

    const getCursorMode = (
      element: Element | null
    ): CursorMode => {
      if (!element) {
        return "default";
      }

      const explicitCursor =
        element.getAttribute("data-cursor");

      if (
        explicitCursor === "view" ||
        explicitCursor === "open" ||
        explicitCursor === "drag" ||
        explicitCursor === "magnetic"
      ) {
        return explicitCursor;
      }

      if (
        element instanceof HTMLInputElement ||
        element instanceof HTMLTextAreaElement ||
        element instanceof HTMLSelectElement
      ) {
        return "default";
      }

      const tagName =
        element.tagName.toLowerCase();

      if (tagName === "a") {
        const href =
          element.getAttribute("href") ?? "";

        if (
          href.startsWith("http://") ||
          href.startsWith("https://")
        ) {
          return "open";
        }

        return "view";
      }

      if (tagName === "button") {
        return "view";
      }

      return "default";
    };

    /*
     * =====================================================
     * MOUSE OVER
     * =====================================================
     */

    const handleMouseOver = (
      event: MouseEvent
    ) => {
      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      const interactiveElement =
        target.closest(
          INTERACTIVE_SELECTOR
        );

      const mode =
        getCursorMode(interactiveElement);

      if (
        interactiveElement instanceof HTMLElement &&
        mode === "magnetic"
      ) {
        setMagneticTarget(
          interactiveElement
        );
      }

      setCursorMode(mode);
    };

    /*
     * =====================================================
     * MOUSE OUT
     * =====================================================
     */

    const handleMouseOut = (
      event: MouseEvent
    ) => {
      const target = event.target;

      if (!(target instanceof Element)) {
        return;
      }

      const relatedTarget =
        event.relatedTarget;

      if (
        relatedTarget instanceof Node &&
        target.contains(relatedTarget)
      ) {
        return;
      }

      const interactiveElement =
        target.closest(
          INTERACTIVE_SELECTOR
        );

      if (interactiveElement) {
        if (
          interactiveElement ===
          magneticTarget.current
        ) {
          resetMagneticTarget();
        }

        setCursorMode("default");
      }
    };

    /*
     * =====================================================
     * EVENT LISTENERS
     * =====================================================
     */

    window.addEventListener(
      "mousemove",
      handleMouseMove,
      {
        passive: true,
      }
    );

    window.addEventListener(
      "mouseenter",
      handleMouseEnter
    );

    window.addEventListener(
      "mouseleave",
      handleMouseLeave
    );

    document.addEventListener(
      "mouseover",
      handleMouseOver
    );

    document.addEventListener(
      "mouseout",
      handleMouseOut
    );

    /*
     * =====================================================
     * START
     * =====================================================
     */

    animationFrame =
      requestAnimationFrame(render);

    /*
     * =====================================================
     * CLEANUP
     * =====================================================
     */

    return () => {
      cancelAnimationFrame(
        animationFrame
      );

      resetMagneticTarget();

      window.removeEventListener(
        "mousemove",
        handleMouseMove
      );

      window.removeEventListener(
        "mouseenter",
        handleMouseEnter
      );

      window.removeEventListener(
        "mouseleave",
        handleMouseLeave
      );

      document.removeEventListener(
        "mouseover",
        handleMouseOver
      );

      document.removeEventListener(
        "mouseout",
        handleMouseOut
      );

      gsap.killTweensOf([
        cursor,
        dot,
        ring,
        label,
      ]);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      aria-hidden="true"
      className="
        pointer-events-none
        fixed
        inset-0
        z-[9999]
        hidden
        lg:block
        mix-blend-difference
      "
    >
      {/* =====================================================
          POINT CENTRAL
      ===================================================== */}

      <div
        ref={dotRef}
        className="
          pointer-events-none
          fixed
          left-0
          top-0
          h-[7px]
          w-[7px]
          rounded-full
          bg-white
          will-change-transform
        "
      />

      {/* =====================================================
          ANNEAU PRINCIPAL
      ===================================================== */}

      <div
        ref={ringRef}
        className="
          pointer-events-none
          fixed
          left-0
          top-0
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-full
          border
          border-white
          bg-transparent
          will-change-transform
        "
      >
        <span
          ref={labelRef}
          className="
            whitespace-nowrap
            font-display
            text-[8px]
            font-semibold
            tracking-[0.12em]
            text-white
            opacity-0
          "
        />
      </div>
    </div>
  );
}