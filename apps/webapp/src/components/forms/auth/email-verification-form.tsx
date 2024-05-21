import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { TextInput } from "../../ui/data-input/text-input";
import { Button } from "../../ui/actions/button";
import { useRouter } from "@tanstack/react-router";
import { EmailVerificationCodeSchema } from "../../../libs/zod/schema";
import { apiTreaty } from "@blazar/elysia";
import { useMutation } from "@tanstack/react-query";

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
    onSubmit: async ({ value, formApi }) => {
      try {
        mutation.mutateAsync({
          code: value.code,
        });

        if (mutation.error) {
          console.error(mutation.error.message);
          throw new Error(mutation.error.message);
        } else {
          formApi.reset();

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

      {mutation.error && <div>{mutation.error.message}</div>}
    </form>
  );
};

export default EmailVerificationForm;
