import { createFileRoute } from "@tanstack/react-router";
import PasswordResetNewForm from "../../../../components/forms/auth/password-reset-new-form";

const Index = () => {
  return <PasswordResetNewForm />;
};

export const Route = createFileRoute("/auth/_layout/password-reset/$token")({
  component: Index,
});
