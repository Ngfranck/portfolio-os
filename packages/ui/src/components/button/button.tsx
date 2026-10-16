import type {
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

export type ButtonVariant =
  | "primary"
  | "secondary"
  | "outline"
  | "ghost";

export type ButtonSize =
  | "sm"
  | "md"
  | "lg";

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}

const variants: Record<ButtonVariant, string> = {
  primary:
    "bg-text-primary text-background hover:opacity-90",

  secondary:
    "bg-surface text-text-primary border border-border hover:bg-background",

  outline:
    "border border-text-primary text-text-primary hover:bg-text-primary hover:text-background",

  ghost:
    "text-text-primary hover:bg-background",
};

const sizes: Record<ButtonSize, string> = {
  sm:
    "h-9 px-4 text-small",

  md:
    "h-11 px-5 text-small",

  lg:
    "h-13 px-6 text-body",
};

export function Button({
  variant = "primary",
  size = "md",
  children,
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`
        inline-flex
        items-center
        justify-center
        gap-2
        rounded-full
        font-sans
        font-medium
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