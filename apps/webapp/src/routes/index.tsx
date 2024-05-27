import { createFileRoute, redirect } from "@tanstack/react-router";
import { apiTreaty } from "@blazar/elysia";
import { getAuthSessionCookie } from "@blazar/helpers";

const Index = () => {
  return <div>Hello world!</div>;
};

export const Route = createFileRoute("/")({
  component: Index,
  beforeLoad: async ({ location }) => {
    try {
      const authSessionCookie = getAuthSessionCookie("auth_session");

      if (!authSessionCookie) {
        throw new Error();
      }

      const { error } = await apiTreaty.api.auth["validate-session"].post({
        sessionId: authSessionCookie,
      });

      if (error) {
        throw new Error();
      }

      // TOOD: Check if the user has completed the onboarding process.

      return true;
    } catch {
      throw redirect({
        to: "/auth/signin",
        search: {
          redirect: location.href,
        },
      });
    }
  },
});
