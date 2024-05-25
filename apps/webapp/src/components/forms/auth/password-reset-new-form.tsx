import { useForm } from "@tanstack/react-form";
import { useRouter } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { TextInput } from "../../ui/data-input/text-input";
import {
  PasswordSchema,
  PasswordSchemaWithMaxLength,
} from "../../../libs/zod/schema";
import { Button } from "../../ui/actions/button";
import { apiTreaty } from "@blazar/elysia";
import { useMutation } from "@tanstack/react-query";
import { cn } from "../../../utils/styles";
import { ErrorList } from "../../ui/feedback/error-list";
import { Alert } from "../../ui/feedback/alert";

const PasswordResetNewForm = () => {
  const router = useRouter();
  const mutation = useMutation({
    mutationKey: ["password-reset-new"],
    mutationFn: async ({ newPassword }: { newPassword: string }) => {
      const { data, error } = await apiTreaty.api.auth["password-reset"][
        ":token"
      ].post({
        newPassword,
      });

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
  });

  const form = useForm({
    defaultValues: {
      newPassword: "",
      confirmNewPassword: "",
    },
    onSubmit: async ({ value }) => {
      try {
        mutation.mutateAsync({
          newPassword: value.newPassword,
        });

        if (mutation.error) {
          console.error(mutation.error.message);
          throw new Error(mutation.error.message);
        } else {
          router.navigate({
            to: "/auth/signin",
          });
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
        name="newPassword"
        validators={{
          onBlur: PasswordSchemaWithMaxLength,
        }}
        children={(field) => {
          return (
            <>
              <TextInput
                type="password"
                id={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                label={{
                  children: "New Password",
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
                  <ErrorList
                    errors={field.state.meta.errors}
                    checks={PasswordSchema._def.checks}
                  />
                </ul>
              )}
            </>
          );
        }}
      />

      <form.Field
        name="confirmNewPassword"
        validators={{
          onChangeListenTo: ["newPassword"],
          onBlur: ({ value, fieldApi }) => {
            if (!value) {
              return "Please confirm your password";
            }

            if (value !== fieldApi.form.getFieldValue("newPassword")) {
              return "Passwords do not match";
            }

            return undefined;
          },
        }}
        children={(field) => {
          return (
            <>
              <TextInput
                type="password"
                id={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                label={{
                  children: "Confirm New Password",
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

export default PasswordResetNewForm;
