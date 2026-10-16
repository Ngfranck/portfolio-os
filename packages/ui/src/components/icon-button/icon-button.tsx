import type {
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

export type IconButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost";

export type IconButtonSize =
  | "sm"
  | "md"
  | "lg";

export interface IconButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: IconButtonVariant;
  size?: IconButtonSize;
  children: ReactNode;
  "aria-label": string;
}

const variants: Record<IconButtonVariant, string> = {
  primary:
    "bg-text-primary text-background hover:opacity-90",

  secondary:
    "bg-surface text-text-primary border border-border hover:bg-background",

  outline:
    "border border-text-primary text-text-primary hover:bg-text-primary hover:text-background",

  ghost:
    "text-text-primary hover:bg-background",
};

const sizes: Record<IconButtonSize, string> = {
  sm: "h-9 w-9",
  md: "h-11 w-11",
  lg: "h-13 w-13",
};

export function IconButton({
  variant = "ghost",
  size = "md",
  children,
  className = "",
  type = "button",
  ...props
}: IconButtonProps) {
  return (
    <button
      type={type}
      className={`
        inline-flex
        shrink-0
        items-center
        justify-center
        rounded-full
        font-sans
        transition-opacity
        duration-200
        focus-visible:outline-none
        focus-visible:ring-2
        focus-visible:ring-accent
        focus-visible:ring-offset-2
        disabled:pointer-events-none
        disabled:opacity-50
        ${variants[variant]}
        ${sizes[size]}
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}