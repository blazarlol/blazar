import { LabelProps, labelVariants } from ".";
import { cn } from "../../../../utils/styles";

const Label = ({ children, className }: LabelProps) => {
  return <label className={cn(labelVariants({ className }))}>{children}</label>;
};

export default Label;
