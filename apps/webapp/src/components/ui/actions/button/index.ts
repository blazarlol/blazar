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
  },
  defaultVariants: {
    size: "default",
  },
});

type Size = keyof typeof variants.variants.size;

type Props = {
  className?: string;
  children?: React.ReactNode;
  size?: Size;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export {
  Root as Button,
  variants as buttonVariants,
  type Props as ButtonProps,
  type Size as ButtonSize,
};
