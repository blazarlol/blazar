import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { TextInput } from "../../ui/data-input/text-input";
import { Button } from "../../ui/actions/button";
import { EmailSchema, PasswordSchema } from "../../../libs/zod/schema";
import { useRouter } from "@tanstack/react-router";

const SignInForm = () => {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value, formApi }) => {
      // TODO: ADD COOKIE CREATION ETC.
      // FOR THIS I NEED TO CREATE LUCIA PACKAGE THAT WILL BE USED IN ALL APPS

      try {
        await fetch("http://localhost:8080/api/auth/signin", {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            email: value.email,
            password: value.password,
          }),
        });

        formApi.reset();

        router.navigate({
          // to: '/onboarding'
        });
      } catch (error) {
        console.error(error);
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
    </form>
  );
};

export default SignInForm;
