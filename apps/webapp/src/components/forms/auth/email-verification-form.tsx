import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { TextInput } from "../../ui/data-input/text-input";
import { Button } from "../../ui/actions/button";
import { useRouter } from "@tanstack/react-router";

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
        await fetch(
          `http://localhost:8080/api/auth/email-verification/${token}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
              code: values.value.code,
            }),
          }
        );

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
        children={(field) => {
          return (
            <TextInput
              type="text"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              label={{ children: "Code", htmlFor: field.name }}
            />
          );
        }}
      />

      <Button type="submit">Verify</Button>
    </form>
  );
};

export default EmailVerificationForm;
