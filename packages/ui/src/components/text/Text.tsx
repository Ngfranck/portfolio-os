import type { ElementType, ReactNode } from "react";

export type TextSize =
  | "body-lg"
  | "body"
  | "small"
  | "caption";

export interface TextProps {
  size?: TextSize;
  as?: ElementType;
  children: ReactNode;
  className?: string;
}

const styles: Record<TextSize, string> = {
  "body-lg":
    "font-sans text-body-lg leading-body-lg tracking-body-lg",

  body:
    "font-sans text-body leading-body tracking-body",

  small:
    "font-sans text-small leading-small tracking-small",

  caption:
    "font-sans text-caption leading-caption tracking-caption",
};

export function Text({
  size = "body",
  as: Component = "p",
  children,
  className = "",
}: TextProps) {
  return (
    <Component className={`${styles[size]} ${className}`}>
      {children}
    </Component>
  );
}