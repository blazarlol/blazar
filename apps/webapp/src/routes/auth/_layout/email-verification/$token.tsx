import { createFileRoute } from "@tanstack/react-router";
import EmailVerificationForm from "../../../../components/forms/auth/email-verification-form";

const Index = () => {
  const { token } = Route.useLoaderData();
  return (
    <div className="flex flex-col justify-center items-center w-full max-w-[576px]">
      <div className="flex flex-col gap-y-4 p-4">
        <h1 className="text-4xl text-accent">Activate your email</h1>
        <p>
          We've sent you an email with a verification code. Please enter the
          code below to activate your email.
        </p>
      </div>
      <EmailVerificationForm token={token} />;
    </div>
  );
};

export const Route = createFileRoute("/auth/_layout/email-verification/$token")(
  {
    loader: ({ params }) => {
      return { token: params.token };
    },
    component: Index,
  }
);
