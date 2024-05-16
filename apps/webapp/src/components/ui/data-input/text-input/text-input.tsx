import { TextInputProps, textInputVariants } from ".";
import { cn } from "../../../../utils/styles";
import { Label } from "../label";

const TextInput = ({
  className,
  variant,
  color,
  area,
  label,
  ...restProps
}: TextInputProps) => {
  return (
    <>
      {label && <Label {...label}>{label.children}</Label>}

      <input
        className={cn(textInputVariants({ className, variant, color, area }))}
        {...restProps}
      />
    </>
  );
};

export default TextInput;
