import type { ElementType, ReactNode } from "react";

export type HeadingLevel =
  | "display"
  | "h1"
  | "h2"
  | "h3"
  | "h4";

export interface HeadingProps {
  level?: HeadingLevel;
  children: ReactNode;
  className?: string;
}

const styles: Record<HeadingLevel, string> = {
  display:
    "font-display text-display leading-display tracking-display font-bold",

  h1:
    "font-display text-h1 leading-h1 tracking-h1 font-bold",

  h2:
    "font-display text-h2 leading-h2 tracking-h2 font-medium",

  h3:
    "font-display text-h3 leading-h3 tracking-h3 font-medium",

  h4:
    "font-display text-h4 leading-h4 tracking-h4 font-medium",
};

const elements: Record<HeadingLevel, ElementType> = {
  display: "h1",
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
};

export function Heading({
  level = "h1",
  children,
  className = "",
}: HeadingProps) {
  const Component = elements[level];

  return (
    <Component className={`${styles[level]} ${className}`}>
      {children}
    </Component>
  );
}