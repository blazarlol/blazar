import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { TextInput } from "../../ui/data-input/text-input";
import { Button } from "../../ui/actions/button";
import { useRouter } from "@tanstack/react-router";
import { EmailVerificationCodeSchema } from "../../../libs/zod/schema";
import { apiTreaty } from "@blazar/elysia";
import { useMutation } from "@tanstack/react-query";
import { Alert } from "../../ui/feedback/alert";
import { cn } from "../../../utils/styles";

interface EmailVerificationFormProps {
  token: string;
}

const EmailVerificationForm = ({ token }: EmailVerificationFormProps) => {
  const router = useRouter();
  const mutation = useMutation({
    mutationKey: ["email-verification"],
    mutationFn: async ({ code }: { code: string }) => {
      const { data, error } = await apiTreaty.api.auth["email-verification"][
        token
      ].post({
        code,
      });

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
  });

  const form = useForm({
    defaultValues: {
      code: "",
    },
    onSubmit: async ({ value }) => {
      try {
        mutation.mutateAsync({
          code: value.code,
        });

        if (mutation.error) {
          console.error(mutation.error.message);
          throw new Error(mutation.error.message);
        } else {
          router.navigate({
            to: "/auth/signin",
          });
        }
      } catch (error) {
        console.error(error);
      }
    },
    validatorAdapter: zodValidator,
  });

  return (
    <form
      className="flex flex-col gap-y-2 self-center w-full max-w-[576px] p-4"
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <form.Field
        name="code"
        validators={{
          onBlur: EmailVerificationCodeSchema,
        }}
        children={(field) => {
          return (
            <>
              <TextInput
                type="text"
                id={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                label={{
                  children: "Code",
                  htmlFor: field.name,
                  className: cn(
                    field.state.meta.errors.length > 0 ? "text-error" : "",
                    "p-1"
                  ),
                }}
                color={field.state.meta.errors.length > 0 ? "error" : "default"}
                variant="bordered"
              />

              {field.state.meta.isTouched && (
                <ul>
                  <li className="text-xs text-error">
                    {field.state.meta.errors}
                  </li>
                </ul>
              )}
            </>
          );
        }}
      />

      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => {
          return (
            <Button
              type="submit"
              disabled={!canSubmit}
              color="accent"
              className="mt-4"
            >
              {isSubmitting ? "..." : "Submit"}
            </Button>
          );
        }}
      />

      {mutation.error && (
        <Alert variant="error" className="mt-4">
          {mutation.error.message}
        </Alert>
      )}
    </form>
  );
};

export default EmailVerificationForm;
