import { ButtonProps, buttonVariants } from ".";
import { cn } from "../../../../utils/styles";

const Button = ({ children, className, size, ...restProps }: ButtonProps) => {
  return (
    <button className={cn(buttonVariants({ className, size }))} {...restProps}>
      {children}
    </button>
  );
};

export default Button;
