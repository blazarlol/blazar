import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/email-verification/$token")({
  component: () => <div>Hello /auth/email-verification/$token!</div>,
});
