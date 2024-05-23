import { createFileRoute } from "@tanstack/react-router";
import PasswordResetForm from "../../../../components/forms/auth/password-reset-form";

const Index = () => {
  return <PasswordResetForm />;
};

export const Route = createFileRoute("/auth/_layout/password-reset/")({
  component: Index,
});
