import { createFileRoute } from "@tanstack/react-router";

const Index = () => {
  return <div>Check your email!</div>;
};

export const Route = createFileRoute("/auth/_layout/email-verification/")({
  component: Index,
});
