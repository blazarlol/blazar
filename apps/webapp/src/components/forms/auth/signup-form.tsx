import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { TextInput } from "../../ui/data-input/text-input";
import { Button } from "../../ui/actions/button";
import { useRouter } from "@tanstack/react-router";
import { EmailSchema, PasswordSchema } from "../../../libs/zod/schema";
import { apiTreaty } from "@blazar/elysia";
import { useMutation } from "@tanstack/react-query";

const SignUpForm = () => {
  const router = useRouter();
  const mutation = useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      const { data, error } = await apiTreaty.api.auth.signup.post({
        email,
        password,
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
      password: "",
      confirmPassword: "",
    },
    onSubmit: async ({ value, formApi }) => {
      try {
        await mutation.mutateAsync({
          email: value.email,
          password: value.password,
        });

        if (mutation.error) {
          console.error(mutation.error.message);
          throw new Error(mutation.error.message);
        } else {
          formApi.reset();

          router.navigate({
            to: "/auth/email-verification",
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
      className="flex flex-col gap-y-2 max-w-64"
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
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                label={{ children: "Email", htmlFor: field.name }}
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
        name="password"
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
                label={{ children: "Password", htmlFor: field.name }}
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
        name="confirmPassword"
        validators={{
          onChangeListenTo: ["password"],
          onBlur: ({ value, fieldApi }) => {
            if (value !== fieldApi.form.getFieldValue("password")) {
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
                  children: "Confirm Password",
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

      <form.Subscribe
        selector={(state) => [state.errors]}
        children={([errors]) => {
          return (
            <div className="text-red-500 text-sm">
              {errors.map((error) => (
                <div>{error}</div>
              ))}
            </div>
          );
        }}
      />

      {mutation.error && <div>{mutation.error.message}</div>}
    </form>
  );
};

export default SignUpForm;
