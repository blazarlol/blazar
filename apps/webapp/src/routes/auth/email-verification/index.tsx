import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/email-verification/")({
  component: () => <div>Hello /auth/email-verification!</div>,
});
