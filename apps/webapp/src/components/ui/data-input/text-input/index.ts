import { LabelProps } from "../label";
import Root from "./text-input";
import { VariantProps, tv } from "tailwind-variants";

const variants = tv({
  base: "input",
  variants: {
    variant: {
      default: "",
      bordered: "input-bordered",
      ghost: "input-ghost border-none",
    },
    color: {
      default: "",
      primary: "input-primary",
      secondary: "input-secondary",
      info: "input-info",
      success: "input-success",
      warning: "input-warning",
      error: "input-error",
    },
    area: {
      default: "",
      xs: "input-xs",
      sm: "input-sm",
      md: "input-md",
      lg: "input-lg",
    },
  },
  defaultVariants: {
    variant: "default",
    color: "default",
    area: "default",
  },
});

type Variant = VariantProps<typeof variants>["variant"];
type Color = VariantProps<typeof variants>["color"];
type Area = VariantProps<typeof variants>["area"];

export type Props = {
  className?: string;
  variant?: Variant;
  color?: Color;
  area?: Area;
  label?: LabelProps;
} & React.InputHTMLAttributes<HTMLInputElement>;

export {
  Root as TextInput,
  variants as textInputVariants,
  type Props as TextInputProps,
  type Variant as TextInputVariant,
  type Color as TextInputColor,
  type Area as TextInputSize,
};
