import { useForm } from "@tanstack/react-form";
import { useRouter } from "@tanstack/react-router";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { TextInput } from "../../ui/data-input/text-input";
import { PasswordSchema } from "../../../libs/zod/schema";
import { Button } from "../../ui/actions/button";
import { apiTreaty } from "@blazar/elysia";
import { useMutation } from "@tanstack/react-query";

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
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <form.Field
        name="newPassword"
        validators={{
          onBlur: PasswordSchema,
        }}
        children={(field) => {
          return (
            <>
              <TextInput
                type="password"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                label={{
                  children: "New Password",
                }}
              />

              {field.state.meta.errors &&
                field.state.meta.errors.map((error) => (
                  <div className="text-red-500 text-sm">{error}</div>
                ))}
            </>
          );
        }}
      />

      <form.Field
        name="confirmNewPassword"
        validators={{
          onChangeListenTo: ["newPassword"],
          onBlur: ({ value, fieldApi }) => {
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
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                label={{
                  children: "Confirm New Password",
                  htmlFor: field.name,
                }}
              />

              {field.state.meta.errors &&
                field.state.meta.errors.map((error) => (
                  <div className="text-red-500 text-sm">{error}</div>
                ))}
            </>
          );
        }}
      />

      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
        children={([canSubmit, isSubmitting]) => {
          return (
            <Button type="submit" disabled={!canSubmit}>
              {isSubmitting ? "..." : "Submit"}
            </Button>
          );
        }}
      />

      {mutation.error && <div>{mutation.error.message}</div>}
    </form>
  );
};

export default PasswordResetNewForm;
