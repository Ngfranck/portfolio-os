import type { IconSvgElement } from "@hugeicons/react";
import { HugeiconsIcon } from "@hugeicons/react";

export type IconSize = "sm" | "md" | "lg";

export interface IconProps {
  icon: IconSvgElement;
  size?: IconSize;
  color?: string;
  strokeWidth?: number;
  className?: string;
}

const sizes: Record<IconSize, number> = {
  sm: 16,
  md: 20,
  lg: 24,
};

export function Icon({
  icon,
  size = "md",
  color = "currentColor",
  strokeWidth = 1.5,
  className = "",
}: IconProps) {
  return (
    <HugeiconsIcon
      icon={icon}
      size={sizes[size]}
      color={color}
      strokeWidth={strokeWidth}
      className={className}
    />
  );
}