import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { TextInput } from "../../ui/data-input/text-input";
import { EmailSchema } from "../../../libs/zod/schema";
import { Button } from "../../ui/actions/button";
import { apiTreaty } from "@blazar/elysia";
import { useMutation } from "@tanstack/react-query";
import { Alert } from "../../ui/feedback/alert";
import { cn } from "../../../utils/styles";

const PasswordResetForm = () => {
  const mutation = useMutation({
    mutationKey: ["password-reset"],
    mutationFn: async ({ email }: { email: string }) => {
      const { data, error } = await apiTreaty.api.auth[
        "password-reset"
      ].index.post({
        email,
      });

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
  });

  const form = useForm({
    defaultValues: {
      email: "",
    },
    onSubmit: async ({ value, formApi }) => {
      try {
        mutation.mutateAsync({
          email: value.email,
        });

        if (mutation.error) {
          console.error(mutation.error.message);
          throw new Error(mutation.error.message);
        } else {
          // TODO: Display some message on message sent
          formApi.reset();
        }
      } catch (e) {
        return;
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
        name="email"
        validators={{
          onBlur: EmailSchema,
        }}
        children={(field) => {
          return (
            <>
              <TextInput
                type="email"
                id={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                label={{
                  children: "Email",
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
        <Alert variant="error" className="mt-2">
          {mutation.error.message}
        </Alert>
      )}
    </form>
  );
};

export default PasswordResetForm;
