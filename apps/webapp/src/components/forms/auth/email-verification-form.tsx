import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { TextInput } from "../../ui/data-input/text-input";
import { Button } from "../../ui/actions/button";
import { useRouter } from "@tanstack/react-router";
import { EmailVerificationCodeSchema } from "../../../libs/zod/schema";
import { apiTreaty } from "@blazar/elysia";

interface EmailVerificationFormProps {
  token: string;
}

const EmailVerificationForm = ({ token }: EmailVerificationFormProps) => {
  const router = useRouter();

  const form = useForm({
    defaultValues: {
      code: "",
    },
    onSubmit: async (values) => {
      try {
        await apiTreaty.api.auth["email-verification"][token].post({
          code: values.value.code,
        });

        values.formApi.reset();

        router.navigate({
          to: "/auth/signin",
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
        name="code"
        validators={{
          onBlur: EmailVerificationCodeSchema,
        }}
        children={(field) => {
          return (
            <>
              <TextInput
                type="text"
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                label={{ children: "Code", htmlFor: field.name }}
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

export default EmailVerificationForm;
