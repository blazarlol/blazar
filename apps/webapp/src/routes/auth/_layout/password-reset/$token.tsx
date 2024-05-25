import { createFileRoute } from "@tanstack/react-router";
import PasswordResetNewForm from "../../../../components/forms/auth/password-reset-new-form";

const Index = () => {
  return (
    <div className="flex flex-col justify-center items-center w-full max-w-[576px]">
      <div className="flex flex-col gap-y-4 p-4">
        <h1 className="text-4xl text-accent">Reset your password</h1>
        <p>
          Ready to reset your password? Enter your new password below. Make sure
          it’s strong and secure.
        </p>
      </div>
      <PasswordResetNewForm />;
    </div>
  );
};

export const Route = createFileRoute("/auth/_layout/password-reset/$token")({
  component: Index,
});
