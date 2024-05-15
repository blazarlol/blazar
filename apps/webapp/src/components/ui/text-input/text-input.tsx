import { TextInputProps, textInputVariants } from ".";
import { cn } from "../../../utils/styles";

const TextInput = ({
  className,
  variant,
  color,
  area,
  ...restProps
}: TextInputProps) => {
  return (
    <input
      className={cn(textInputVariants({ className, variant, color, area }))}
      {...restProps}
    />
  );
};

export default TextInput;
