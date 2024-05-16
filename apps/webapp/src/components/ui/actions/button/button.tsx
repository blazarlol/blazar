import { ButtonProps, buttonVariants } from ".";
import { cn } from "../../../../utils/styles";

const Button = ({ children, className }: ButtonProps) => {
  return (
    <button className={cn(buttonVariants({ className }))}>{children}</button>
  );
};

export default Button;
