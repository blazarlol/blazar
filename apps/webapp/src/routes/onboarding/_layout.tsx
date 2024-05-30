import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { useAuth } from "../../auth";

const Index = () => {
  const { loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      Hello /onboarding/_layout!
      <Outlet />
    </div>
  );
};

export const Route = createFileRoute("/onboarding/_layout")({
  component: Index,
  beforeLoad: async ({ context }) => {
    const { session, user, loading } = context.auth;

    if (loading) {
      return false;
    }

    if (!session || !user || !user.emailVerified) {
      throw redirect({
        to: "/auth/signin",
      });
    }

    if (user.onboardingComplete) {
      throw redirect({
        to: "/",
      });
    }

    return true;
  },
});
