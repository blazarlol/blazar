import { AlertProps, alertVariants } from ".";
import { cn } from "../../../../utils/styles";

const Error = ({ children, className, variant, size }: AlertProps) => {
  return (
    <div className={cn(alertVariants({ className, variant, size }))}>
      {children}
    </div>
  );
};

export default Error;
