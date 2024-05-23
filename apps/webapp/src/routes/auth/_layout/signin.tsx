import { createFileRoute } from "@tanstack/react-router";
import SignInForm from "../../../components/forms/auth/signin-form";

const Index = () => {
  return <SignInForm />;
};

export const Route = createFileRoute("/auth/_layout/signin")({
  component: Index,
  validateSearch: (search) => search as { redirect?: string },
});
