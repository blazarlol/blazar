import { apiTreaty } from "@blazar/elysia";
import { getAuthSessionCookie } from "@blazar/helpers";
import { createFileRoute, redirect } from "@tanstack/react-router";

const Index = () => {
  return <div>Hello /onboarding/_layout!</div>;
};

export const Route = createFileRoute("/onboarding/_layout")({
  component: Index,
  beforeLoad: async () => {
    const authSessionCookie = getAuthSessionCookie("auth_session");

    if (!authSessionCookie) {
      throw redirect({
        to: "/auth/signin",
      });
    }

    const { data: sessionData, error: sessionError } = await apiTreaty.api.auth[
      "validate-session"
    ].post({
      sessionId: authSessionCookie,
    });

    if (sessionError) {
      throw redirect({
        to: "/auth/signin",
      });
    }

    const { user } = sessionData;

    const { data: userData, error: userError } = await apiTreaty.api
      .account({ userId: user!.id })
      .get();

    if (userError) {
      throw redirect({
        to: "/auth/signin",
      });
    }

    // TODO: Redirect to dashboard based on the onboarding-completed field.
    if (userData.account.userName) {
      throw redirect({
        // TODO: Redirect to the subscription plan page.
        to: "/",
      });
    }

    // TODO: If the user has not completed the onboarding process, redirect to the next available step.
  },
});
