import type { HTMLAttributes, ReactNode } from "react";

export type BadgeVariant =
  | "default"
  | "accent"
  | "outline"
  | "dark";

export interface BadgeProps
  extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  children: ReactNode;
}

const variants: Record<BadgeVariant, string> = {
  default:
    "bg-background text-text-secondary border border-border",

  accent:
    "bg-accent-soft text-accent",

  outline:
    "border border-text-primary text-text-primary",

  dark:
    "bg-text-primary text-background",
};

export function Badge({
  variant = "default",
  children,
  className = "",
  ...props
}: BadgeProps) {
  return (
    <span
      className={`
        inline-flex
        items-center
        gap-2
        rounded-full
        px-3
        py-1.5
        font-sans
        text-caption
        leading-caption
        tracking-caption
        font-medium
        ${variants[variant]}
        ${className}
      `}
      {...props}
    >
      {children}
    </span>
  );
}