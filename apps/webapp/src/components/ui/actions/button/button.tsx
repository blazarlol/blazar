import { ButtonProps, buttonVariants } from ".";
import { cn } from "../../../../utils/styles";

const Button = ({
  children,
  className,
  size,
  color,
  ...restProps
}: ButtonProps) => {
  return (
    <button
      className={cn(buttonVariants({ className, size, color }))}
      {...restProps}
    >
      {children}
    </button>
  );
};

export default Button;
