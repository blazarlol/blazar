import { createFileRoute } from "@tanstack/react-router";
import PasswordResetForm from "../../../../components/forms/auth/password-reset-form";

const Index = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full max-w-[576px]">
      <div className="flex flex-col gap-y-4 p-4">
        <h1 className="text-4xl text-accent">Forgot yout password?</h1>
        <p>
          Don't worry! We'll help you recover your account. Just provide the
          email address associated with your account.
        </p>
      </div>

      <PasswordResetForm />
    </div>
  );
};

export const Route = createFileRoute("/auth/_layout/password-reset/")({
  component: Index,
});
