import { LabelProps, labelVariants } from ".";
import { cn } from "../../../../utils/styles";

const Label = ({ children, className, size, ...restProps }: LabelProps) => {
  return (
    <label className={cn(labelVariants({ className, size }))} {...restProps}>
      {children}
    </label>
  );
};

export default Label;
