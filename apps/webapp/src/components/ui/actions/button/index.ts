import { tv } from "tailwind-variants";
import Root from "./button";

const variants = tv({
  base: "btn",
  variants: {},
});

type Props = {
  className?: string;
  children?: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export {
  Root as Button,
  variants as buttonVariants,
  type Props as ButtonProps,
};
