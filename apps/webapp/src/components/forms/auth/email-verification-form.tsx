import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { TextInput } from "../../ui/data-input/text-input";
import { Button } from "../../ui/actions/button";
import { useParams, useRouter } from "@tanstack/react-router";
import { EmailVerificationCodeSchema } from "../../../libs/zod/schema";
import { apiTreaty } from "@blazar/elysia";
import { useMutation } from "@tanstack/react-query";
import { Alert } from "../../ui/feedback/alert";
import { cn } from "../../../utils/styles";
import { CustomError } from "@blazar/helpers";
import { redirectMessage } from "../../../utils/message";
import { OTPInput } from "../../ui/data-input/otp-input";

const EmailVerificationForm = () => {
  const router = useRouter();
  const { token } = useParams({
    from: "/auth/_layout/email-verification/$token",
  });
  const mutation = useMutation({
    mutationKey: ["email-verification"],
    mutationFn: async ({ code }: { code: string }) => {
      const { data, error } = await apiTreaty.api.auth["email-verification"]({
        token,
      }).post({
        code,
      });

      if (error) {
        throw new CustomError(error.value, error.status);
      }

      return data;
    },
  });

  const form = useForm({
    defaultValues: {
      code: "",
    },
    onSubmit: async ({ value }) => {
      try {
        await mutation.mutateAsync({
          code: value.code,
        });

        if (mutation.error) {
          console.error(mutation.error.message);
          throw new Error(mutation.error.message);
        } else {
          router.navigate({
            to: "/auth/signin",
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
      className="flex flex-col gap-y-2 self-center w-full max-w-[576px] p-4"
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
              <OTPInput
                maxLength={6}
                id={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e)}
              >
                <OTPInput.Group>
                  {Array.from({ length: 3 }).map((_, index) => (
                    <OTPInput.Slot key={index} index={index} />
                  ))}
                </OTPInput.Group>

                <OTPInput.Seperator />

                <OTPInput.Group>
                  {Array.from({ length: 3 }).map((_, index) => (
                    <OTPInput.Slot key={index} index={index + 3} />
                  ))}
                </OTPInput.Group>
              </OTPInput>

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

      <div className="mt-2">
        {mutation.error && (
          <Alert variant="error">{mutation.error.message}</Alert>
        )}

        {mutation.isSuccess && mutation.data && (
          <Alert variant="success">
            {redirectMessage(mutation.data.message)}
          </Alert>
        )}
      </div>
    </form>
  );
};

export default EmailVerificationForm;
