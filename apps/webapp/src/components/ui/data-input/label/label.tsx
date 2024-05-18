import { LabelProps, labelVariants } from ".";
import { cn } from "../../../../utils/styles";

const Label = ({ children, className, size }: LabelProps) => {
  return (
    <label className={cn(labelVariants({ className, size }))}>{children}</label>
  );
};

export default Label;
