import { ButtonProps, buttonVariants } from ".";
import { cn } from "../../../../utils/styles";

const Button = ({ children, className, ...restProps }: ButtonProps) => {
  return (
    <button className={cn(buttonVariants({ className }))} {...restProps}>
      {children}
    </button>
  );
};

export default Button;
