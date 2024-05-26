import {
  OTPInputContext as OTPInputPrimitiveContext,
  OTPInput as OTPInputPrimitive,
} from "input-otp";
import {
  OTPInputContainerVariants,
  OTPInputGroupProps,
  OTPInputGroupVariants,
  OTPInputProps,
  OTPInputSlotProps,
  OTPInputSlotVariants,
} from ".";
import { useContext } from "react";
import { FakeCaret } from "../../feedback/fake-caret";
import { Dot } from "lucide-react";
import { cn } from "../../../../utils/styles";

const OTPInput = ({
  className,
  containerClassName,
  ...props
}: OTPInputProps) => {
  return (
    <OTPInputPrimitive
      containerClassName={cn(
        containerClassName,
        "flex gap-x-1 items-center justify-evenly"
      )}
      className={cn(OTPInputContainerVariants({ className }))}
      {...props}
    />
  );
};

OTPInput.displayName = "OTPInput";

const OTPInputGroup = ({ className, children }: OTPInputGroupProps) => {
  return (
    <div className={cn(OTPInputGroupVariants({ className }))}>{children}</div>
  );
};

OTPInputGroup.displayName = "OTPInputGroup";
OTPInput.Group = OTPInputGroup;

const OTPInputSlot = ({ className, index }: OTPInputSlotProps) => {
  const OTPInputContext = useContext(OTPInputPrimitiveContext);
  const { char, hasFakeCaret, isActive } = OTPInputContext.slots[index];

  return (
    <div
      className={cn(
        OTPInputSlotVariants({
          className,
          state: isActive ? "active" : "default",
        })
      )}
    >
      {char}
      {hasFakeCaret && <FakeCaret />}
    </div>
  );
};

OTPInputSlot.displayName = "OTPInputSlot";
OTPInput.Slot = OTPInputSlot;

const OTPInputSeperator = () => {
  return (
    <div role="separator">
      <Dot />
    </div>
  );
};

OTPInputSeperator.displayName = "OTPInputSeperator";
OTPInput.Seperator = OTPInputSeperator;

export default OTPInput;
