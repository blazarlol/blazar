import { tv } from "tailwind-variants";
import Root from "./label";

const variants = tv({
  base: "label",
  variants: {},
});

type Props = {
  className?: string;
  children?: React.ReactNode;
} & React.LabelHTMLAttributes<HTMLLabelElement>;

export { Root as Label, variants as labelVariants, type Props as LabelProps };
