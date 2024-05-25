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
    <div className="flex flex-col gap-y-1">
      {label && (
        <Label className={cn(label.className)} {...label}>
          {label.children}
        </Label>
      )}

      <input
        className={cn(textInputVariants({ className, variant, color, area }))}
        {...restProps}
      />
    </div>
  );
};

export default TextInput;
