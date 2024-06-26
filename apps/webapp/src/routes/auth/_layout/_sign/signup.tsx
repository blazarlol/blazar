import { createFileRoute } from "@tanstack/react-router";
import SignUpForm from "../../../../components/forms/auth/signup-form";

const Index = () => {
  return <SignUpForm />;
};

export const Route = createFileRoute("/auth/_layout/_sign/signup")({
  component: Index,
});
