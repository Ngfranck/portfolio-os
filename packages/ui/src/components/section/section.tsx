import type { HTMLAttributes, ReactNode } from "react";

export interface SectionProps
  extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
}

export function Section({
  children,
  className = "",
  ...props
}: SectionProps) {
  return (
    <section
      className={`w-full py-24 ${className}`}
      {...props}
    >
      {children}
    </section>
  );
}