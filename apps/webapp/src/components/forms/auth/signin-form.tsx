import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { TextInput } from "../../ui/data-input/text-input";
import { Button } from "../../ui/actions/button";
import {
  EmailSchema,
  PasswordSchema,
  simplePasswordSchema,
} from "../../../libs/zod/schema";
import { Link, useRouter, useSearch } from "@tanstack/react-router";
import { apiTreaty } from "@blazar/elysia";
import { createAuthSessionCookie } from "@blazar/helpers";
import { useMutation } from "@tanstack/react-query";
import { cn } from "../../../utils/styles";
import { Alert } from "../../ui/feedback/alert";

const SignInForm = () => {
  const router = useRouter();
  const search = useSearch({
    from: "/auth/_layout/_sign/signin",
  });

  const mutation = useMutation({
    mutationKey: ["signin"],
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      const { data, error } = await apiTreaty.api.auth.signin.post({
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
    },
    onSubmit: async ({ value }) => {
      try {
        const result = await mutation.mutateAsync({
          email: value.email,
          password: value.password,
        });

        if (mutation.error) {
          console.error(mutation.error.message);
          throw new Error(mutation.error.message);
        } else {
          if (!result.sessionCookie) {
            throw new Error("Session cookie not found");
          }

          createAuthSessionCookie(
            result.sessionCookie.name,
            result.sessionCookie.value,
            {
              maxAge: result.sessionCookie.attributes.maxAge,
              domain: result.sessionCookie.attributes.domain,
              path: result.sessionCookie.attributes.path,
              secure: result.sessionCookie.attributes.secure,
              sameSite: result.sessionCookie.attributes.sameSite,
              // TODO: Change the cookie generation to be server sided in the future
              // httpOnly: sessionCookieData.attributes.httpOnly,
            }
          );

          router.navigate({
            to: search.redirect || "/",
          });
        }
      } catch (error) {
        return;
      }
    },
    validatorAdapter: zodValidator,
  });

  return (
    <form
      className="flex flex-col gap-y-2 self-center w-full max-w-[576px] p-4 lg:pr-12"
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
                placeholder="your@email.com"
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

              {/* TODO: Create Error component and ErrorList component */}
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

      <form.Field
        name="password"
        validators={{
          onBlur: simplePasswordSchema,
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
                  children: "Password",
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

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-x-1.5">
                  <input type="checkbox" className="checkbox w-5 h-5" />
                  <label className="text-sm">Remember me</label>
                </div>

                <Link
                  className="text-sm self-end font-semibold hover:link"
                  to={"/auth/password-reset"}
                >
                  Forgot your password?
                </Link>
              </div>
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

      <div className="self-center">
        Don't have an account?{" "}
        <Link to="/auth/signup" className="font-semibold hover:link">
          Sign up
        </Link>
      </div>

      {mutation.error && (
        <Alert variant="error" className="mt-4">
          {mutation.error.message}
        </Alert>
      )}
    </form>
  );
};

export default SignInForm;
