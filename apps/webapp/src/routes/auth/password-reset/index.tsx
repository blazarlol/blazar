import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/password-reset/")({
  component: () => <div>Hello /auth/reset-password/!</div>,
});
