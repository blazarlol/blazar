import { tv } from "tailwind-variants";
import Root from "./error-list";
import { ZodStringCheck } from "zod";
import { ValidationError } from "@tanstack/react-form";

const variants = tv({
  base: "text-xs",
});

interface Props {
  errors: ValidationError[];
  checks: ZodStringCheck[];
  className?: string;
}

export {
  Root as ErrorList,
  variants as errorListVariants,
  type Props as ErrorListProps,
};
