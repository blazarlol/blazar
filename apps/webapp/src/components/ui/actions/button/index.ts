import { tv } from "tailwind-variants";
import Root from "./button";

const variants = tv({
  base: "btn",
  variants: {
    size: {
      xs: "btn-xs",
      sm: "btn-sm",
      default: "btn-md",
      lg: "btn-lg",
    },
    color: {
      neutral: "btn-neutral",
      primary: "btn-primary",
      secondary: "btn-secondary",
      accent: "btn-accent",
      info: "btn-info",
      success: "btn-success",
      warning: "btn-warning",
      error: "btn-error",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

type Size = keyof typeof variants.variants.size;
type Color = keyof typeof variants.variants.color;

type Props = {
  className?: string;
  children?: React.ReactNode;
  size?: Size;
  color?: Color;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export {
  Root as Button,
  variants as buttonVariants,
  type Props as ButtonProps,
  type Size as ButtonSize,
  type Color as ButtonColor,
};
