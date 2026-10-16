"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { HugeiconsIcon } from "@hugeicons/react";

import {
  Analytics01Icon,
  Archive01Icon,
  Briefcase01Icon,
  Folder01Icon,
  Home01Icon,
  Mail01Icon,
  Settings01Icon,
  StarIcon,
  UserGroupIcon,
} from "@hugeicons/core-free-icons";

const navigation = [
  {
    label: "Dashboard",
    href: "/",
    icon: Home01Icon,
  },
  {
    label: "Projects",
    href: "/projects",
    icon: Briefcase01Icon,
  },
  {
    label: "Articles",
    href: "/articles",
    icon: Archive01Icon,
  },
  {
    label: "Services",
    href: "/services",
    icon: Folder01Icon,
  },
  {
    label: "Testimonials",
    href: "/testimonials",
    icon: StarIcon,
  },
  {
    label: "Categories",
    href: "/categories",
    icon: UserGroupIcon,
  },
  {
    label: "Messages",
    href: "/messages",
    icon: Mail01Icon,
  },
];

const secondaryNavigation = [
  {
    label: "Analytics",
    href: "/analytics",
    icon: Analytics01Icon,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings01Icon,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const allNavigation = [...navigation, ...secondaryNavigation];

  return (
    <>
      {/* ============================================================
          MOBILE NAVIGATION
          ============================================================ */}
      <nav
        aria-label="Navigation principale"
        className="fixed inset-x-3 bottom-3 z-50 lg:hidden"
      >
        <div className="rounded-2xl border border-[#e5e5e2] bg-white/95 p-2 shadow-[0_8px_30px_rgba(17,17,17,0.08)] backdrop-blur-md">
          <div className="flex items-stretch justify-between gap-1">
            {allNavigation.slice(0, 5).map((item) => {
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={[
                    "group flex min-h-14 min-w-0 flex-1 flex-col items-center justify-center gap-1.5 rounded-xl px-1.5 py-2 text-[10px] font-medium transition-colors duration-150",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E30613] focus-visible:ring-offset-2",
                    active
                      ? "bg-[#FDE8EA] text-[#111]"
                      : "text-[#666] active:bg-[#f7f7f5]",
                  ].join(" ")}
                >
                  <HugeiconsIcon
                    icon={item.icon}
                    size={19}
                    strokeWidth={1.7}
                    className={
                      active ? "text-[#E30613]" : "text-[#666]"
                    }
                  />

                  <span className="max-w-full truncate">
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {/* ============================================================
          DESKTOP SIDEBAR
          ============================================================ */}
      <aside className="fixed inset-y-3 left-3 z-40 hidden w-[232px] lg:flex lg:flex-col">
        <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-[#e5e5e2] bg-white shadow-[0_8px_30px_rgba(17,17,17,0.04)]">
          {/* Header */}
          <div className="px-5 pb-5 pt-5">
            <Link
              href="/"
              className="group flex items-center justify-between rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E30613] focus-visible:ring-offset-4"
              aria-label="Gonar.ui Admin"
            >
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#111] text-xs font-semibold tracking-[-0.02em] text-white transition-transform duration-150 motion-safe:group-hover:scale-[1.03]">
                  G
                </div>

                <div className="leading-none">
                  <p className="text-[14px] font-semibold tracking-[-0.025em] text-[#111]">
                    Gonar.ui
                  </p>

                  <p className="mt-1 text-[10px] font-medium uppercase tracking-[0.12em] text-[#999]">
                    Admin
                  </p>
                </div>
              </div>

              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full bg-[#E30613]"
              />
            </Link>
          </div>

          <div className="mx-5 h-px bg-[#e5e5e2]" />

          {/* Navigation */}
          <nav
            aria-label="Navigation principale"
            className="flex flex-1 flex-col overflow-y-auto px-3 py-6"
          >
            {/* Workspace */}
            <div>
              <div className="mb-3 flex items-center justify-between px-2">
                <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#999]">
                  Workspace
                </p>

                <span className="text-[9px] font-medium text-[#c2c2bf]">
                  01
                </span>
              </div>

              <div className="space-y-1">
                {navigation.map((item) => {
                  const active = isActive(item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={[
                        "group relative flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors duration-150",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E30613] focus-visible:ring-offset-2",
                        active
                          ? "bg-[#FDE8EA] text-[#111]"
                          : "text-[#666] hover:bg-[#f7f7f5] hover:text-[#111]",
                      ].join(" ")}
                    >
                      {active && (
                        <span
                          aria-hidden="true"
                          className="absolute left-0 top-1/2 h-5 w-[2px] -translate-y-1/2 rounded-full bg-[#E30613]"
                        />
                      )}

                      <HugeiconsIcon
                        icon={item.icon}
                        size={17}
                        strokeWidth={1.7}
                        className={[
                          "shrink-0 transition-colors duration-150",
                          active
                            ? "text-[#E30613]"
                            : "text-[#666] group-hover:text-[#111]",
                        ].join(" ")}
                      />

                      <span className="flex-1 truncate">
                        {item.label}
                      </span>

                      {active && (
                        <span
                          aria-hidden="true"
                          className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#E30613]"
                        />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* System */}
            <div className="mt-8">
              <div className="mb-3 flex items-center justify-between px-2">
                <p className="text-[9px] font-semibold uppercase tracking-[0.16em] text-[#999]">
                  System
                </p>

                <span className="text-[9px] font-medium text-[#c2c2bf]">
                  02
                </span>
              </div>

              <div className="space-y-1">
                {secondaryNavigation.map((item) => {
                  const active = isActive(item.href);

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      aria-current={active ? "page" : undefined}
                      className={[
                        "group relative flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-colors duration-150",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E30613] focus-visible:ring-offset-2",
                        active
                          ? "bg-[#FDE8EA] text-[#111]"
                          : "text-[#666] hover:bg-[#f7f7f5] hover:text-[#111]",
                      ].join(" ")}
                    >
                      {active && (
                        <span
                          aria-hidden="true"
                          className="absolute left-0 top-1/2 h-5 w-[2px] -translate-y-1/2 rounded-full bg-[#E30613]"
                        />
                      )}

                      <HugeiconsIcon
                        icon={item.icon}
                        size={17}
                        strokeWidth={1.7}
                        className={[
                          "shrink-0 transition-colors duration-150",
                          active
                            ? "text-[#E30613]"
                            : "text-[#666] group-hover:text-[#111]",
                        ].join(" ")}
                      />

                      <span className="flex-1 truncate">
                        {item.label}
                      </span>

                      {active && (
                        <span
                          aria-hidden="true"
                          className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#E30613]"
                        />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          </nav>

          {/* Account */}
          <div className="px-3 pb-3">
            <div className="mb-3 h-px bg-[#e5e5e2]" />

            <div className="flex items-center gap-3 rounded-xl px-3 py-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#111] text-xs font-semibold text-white">
                G
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-[13px] font-medium tracking-[-0.01em] text-[#111]">
                  Gonar.ui
                </p>

                <p className="mt-0.5 truncate text-[10px] uppercase tracking-[0.08em] text-[#999]">
                  Administrator
                </p>
              </div>

              <span
                aria-label="Utilisateur connecté"
                className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#48A868]"
              />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}