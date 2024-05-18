import { tv } from "tailwind-variants";
import Root from "./label";

const variants = tv({
  base: "label",
  variants: {
    size: {
      sm: "text-sm",
      default: "text-base",
      lg: "text-lg",
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
} & React.LabelHTMLAttributes<HTMLLabelElement>;

export {
  Root as Label,
  variants as labelVariants,
  type Props as LabelProps,
  type Size as LabelSize,
};
