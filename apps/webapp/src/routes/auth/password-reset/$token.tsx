import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/password-reset/$token")({
  component: () => <div>Hello /auth/reset-password/$token!</div>,
});
