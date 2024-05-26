import type {
  // SlotProps as OTPInputPrimitiveSlotProps,
  OTPInputProps as OTPInputPrimitiveProps,
} from "input-otp";
import Root from "./otp-input";
import { VariantProps, tv } from "tailwind-variants";

const containerVariants = tv({
  base: "",
});

const groupVariants = tv({
  base: "group flex gap-x-2",
});

const slotVariants = tv({
  // base: "relative w-10 h-14 text-[2rem] flex items-center justify-center transition-all duration-300 border-border border-y border-r first:border-l first:rounded-l-md last:rounded-r-md group-hover:border-accent-foreground/20 group-focus-within:border-accent-foreground/20 outline outline-0 outline-accent-foreground/20",
  base: "input input-bordered flex items-center justify-center w-20 h-20 relative",
  variants: {
    state: {
      default: "",
      active: "outline outline-2 outline-accent outline-offset-2",
    },
  },
  defaultVariants: {
    state: "default",
  },
});

type SlotState = VariantProps<typeof slotVariants>["state"];

type ContainerProps = { className?: string } & OTPInputPrimitiveProps;
type GroupProps = { className?: string; children: React.ReactNode };
type SlotProps = {
  className?: string;
  state?: SlotState;
  index: number;
};

export {
  Root as OTPInput,
  containerVariants as OTPInputContainerVariants,
  groupVariants as OTPInputGroupVariants,
  slotVariants as OTPInputSlotVariants,
  type ContainerProps as OTPInputProps,
  type GroupProps as OTPInputGroupProps,
  type SlotProps as OTPInputSlotProps,
};
