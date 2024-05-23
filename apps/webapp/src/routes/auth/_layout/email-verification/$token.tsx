import { createFileRoute } from "@tanstack/react-router";
import EmailVerificationForm from "../../../../components/forms/auth/email-verification-form";

const Index = () => {
  const { token } = Route.useLoaderData();

  return <EmailVerificationForm token={token} />;
};

export const Route = createFileRoute("/auth/_layout/email-verification/$token")(
  {
    loader: ({ params }) => {
      return { token: params.token };
    },
    component: Index,
  }
);
