"use client";

import { useLayoutEffect } from "react";
import { usePathname } from "next/navigation";

const pendingPathKey = "portfolio:pending-navigation-path";

export function PageScrollManager() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    const pendingPath = window.sessionStorage.getItem(pendingPathKey);

    if (pendingPath) {
      window.sessionStorage.removeItem(pendingPathKey);

      if (pendingPath === pathname) {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      }
    }

    const handleInternalNavigation = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      const link = target.closest("a");
      if (
        !link ||
        link.target === "_blank" ||
        link.hasAttribute("download") ||
        !link.href
      ) {
        return;
      }

      const destination = new URL(link.href);
      if (
        destination.origin !== window.location.origin ||
        destination.pathname === window.location.pathname ||
        destination.hash
      ) {
        return;
      }

      window.sessionStorage.setItem(pendingPathKey, destination.pathname);
    };

    document.addEventListener("click", handleInternalNavigation, true);
    return () => {
      document.removeEventListener("click", handleInternalNavigation, true);
    };
  }, [pathname]);

  return null;
}
