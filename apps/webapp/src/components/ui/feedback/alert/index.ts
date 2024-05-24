import { VariantProps, tv } from "tailwind-variants";
import Root from "./alert";

const variants = tv({
  base: "alert",
  variants: {
    variant: {
      info: "alert-info",
      success: "alert-success",
      warning: "alert-warning",
      error: "alert-error",
    },
    size: {
      xs: "py-0.5 px-2 text-xs rounded-md",
      sm: "p-1 px-2 text-sm rounded-lg",
      default: "p-2 px-3 rounded-xl",
      lg: "p-4 text-lg rounded-2xl",
    },
  },
  defaultVariants: {
    variant: "info",
  },
});

type Variant = VariantProps<typeof variants>["variant"];
type Size = VariantProps<typeof variants>["size"];

interface Props {
  children: React.ReactNode;
  className?: string;
  variant?: Variant;
  size?: Size;
}

export {
  Root as Alert,
  variants as alertVariants,
  type Props as AlertProps,
  type Variant as AlertVariant,
  type Size as AlertSize,
};
