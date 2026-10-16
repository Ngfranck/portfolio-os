import type { HTMLAttributes, ReactNode } from "react";

export interface ContainerProps
  extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function Container({
  children,
  className = "",
  ...props
}: ContainerProps) {
  return (
    <div
      className={`mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}