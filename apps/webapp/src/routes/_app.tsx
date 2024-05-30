import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { useAuth } from "../auth";

const Index = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user?.onboardingComplete) {
    return <div>Redirecting...</div>;
  }

  return <Outlet />;
};

export const Route = createFileRoute("/_app")({
  component: Index,
  beforeLoad: async ({ context, location }) => {
    const { user, session, loading, signOut } = context.auth;

    if (loading) {
      return;
    }

    if (!session) {
      throw redirect({
        to: "/auth/signin",
        search: {
          redirect: location.href,
        },
      });
    }

    if (!user?.emailVerified) {
      signOut();

      throw redirect({
        to: "/auth/signin",
      });
    }

    if (!user?.onboardingComplete) {
      throw redirect({
        to: "/onboarding/account-info",
      });
    }

    return true;
  },
});
