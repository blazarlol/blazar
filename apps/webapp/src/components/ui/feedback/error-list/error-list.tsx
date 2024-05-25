import { ErrorListProps, errorListVariants } from ".";
import { Check, X } from "lucide-react";
import { cn } from "../../../../utils/styles";

const createErrorList = (errors: string) => {
  const result = errors.split(", ");

  if (result[0] === "") {
    return [];
  }

  return result;
};

const ErrorList = ({ errors, checks, className }: ErrorListProps) => {
  const formErrors = createErrorList(errors.join(", "));

  if (formErrors.length === 0) {
    return null;
  }

  return (
    <ul className={cn(errorListVariants({ className }))}>
      {checks.map((check) => {
        if (check.message && formErrors.includes(check.message)) {
          return (
            <div className="text-error flex gap-x-1 justify-start items-center">
              <X
                size={16}
                className="w-4 h-4 flex justify-center items-center"
              />
              <span>{check.message}</span>
            </div>
          );
        }

        return (
          <div className="text-success flex gap-x-1 justify-start items-center">
            <Check
              size={16}
              className="w-4 h-4 flex justify-center items-center"
            />
            <span>{check.message}</span>
          </div>
        );
      })}
    </ul>
  );
};

export default ErrorList;
