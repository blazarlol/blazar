import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { TextInput } from "../../ui/data-input/text-input";
import { Button } from "../../ui/actions/button";
import { useRouter } from "@tanstack/react-router";
import {
  EmailSchema,
  PasswordSchema,
  PasswordSchemaWithMaxLength,
} from "../../../libs/zod/schema";
import { apiTreaty } from "@blazar/elysia";
import { useMutation } from "@tanstack/react-query";
import { Alert } from "../../ui/feedback/alert";

const createErrorList = (errors: string) => {
  const result = errors.split(", ");

  if (result[0] === "") {
    return [];
  }

  return result;
};

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
    onSubmit: async ({ value }) => {
      try {
        await mutation.mutateAsync({
          email: value.email,
          password: value.password,
        });

        if (mutation.error) {
          console.error(mutation.error.message);
          throw new Error(mutation.error.message);
        } else {
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
                color={field.state.meta.errors.length > 0 ? "error" : "default"}
              />

              <ul>
                {field.state.meta.isTouched &&
                  EmailSchema._def.checks.map((check) => {
                    const formErrors = createErrorList(
                      field.state.meta.errors.join(", ")
                    );

                    if (formErrors.length === 0) {
                      return "";
                    }

                    if (check.message && formErrors.includes(check.message)) {
                      return <div>X {check.message}</div>;
                    }

                    return <div>GIT {check.message}</div>;
                  })}
              </ul>
            </>
          );
        }}
      />

      <form.Field
        name="password"
        validators={{
          onBlur: PasswordSchemaWithMaxLength,
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
                color={field.state.meta.errors.length > 0 ? "error" : "default"}
              />

              {/* TODO: Make it a reusable component with props */}
              <ul>
                {field.state.meta.isTouched &&
                  PasswordSchema._def.checks.map((check) => {
                    const formErrors = createErrorList(
                      field.state.meta.errors.join(", ")
                    );

                    if (formErrors.length === 0) {
                      return "";
                    }

                    if (check.message && formErrors.includes(check.message)) {
                      return <div>X {check.message}</div>;
                    }

                    return <div>GIT {check.message}</div>;
                  })}
              </ul>
            </>
          );
        }}
      />

      <form.Field
        name="confirmPassword"
        validators={{
          onChangeListenTo: ["password"],
          onBlur: ({ value, fieldApi }) => {
            if (!value) {
              return "Please confirm your password";
            }

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
                color={field.state.meta.errors.length > 0 ? "error" : "default"}
              />

              {field.state.meta.errors.length > 0 &&
                field.state.meta.errors.map((error) => {
                  if (error) {
                    return error.split(", ").map((err) => <div>{err}</div>);
                  }
                  return null;
                })}
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

      {mutation.error && (
        <Alert variant="error">{mutation.error.message}</Alert>
      )}
    </form>
  );
};

export default SignUpForm;
