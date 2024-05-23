import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { TextInput } from "../../ui/data-input/text-input";
import { Button } from "../../ui/actions/button";
import { EmailSchema, PasswordSchema } from "../../../libs/zod/schema";
import { useRouter, useSearch } from "@tanstack/react-router";
import { apiTreaty } from "@blazar/elysia";
import { createAuthSessionCookie } from "@blazar/helpers";
import { useMutation } from "@tanstack/react-query";

const SignInForm = () => {
  const router = useRouter();
  const search = useSearch({
    from: "/auth/_layout/signin",
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
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                label={{
                  children: "Email",
                }}
              />

              {/* TODO: Create Error component and ErrorList component */}
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
                label={{
                  children: "Password",
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

export default SignInForm;
