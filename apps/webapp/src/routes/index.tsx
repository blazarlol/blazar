import { createFileRoute, redirect } from "@tanstack/react-router";
import { getAuthSessionCookie } from "@blazar/helpers";
import { apiTreaty } from "@blazar/elysia";

const Index = () => {
  return <div>Hello world!</div>;
};

export const Route = createFileRoute("/")({
  component: Index,
  beforeLoad: async ({ location }) => {
    try {
      const authSessionCookie = getAuthSessionCookie("auth_session");

      if (!authSessionCookie) {
        throw new Error("No auth session cookie found");
      }

      const { error } = await apiTreaty.api.auth["validate-session"].post({
        sessionId: authSessionCookie,
      });

      if (error) {
        throw new Error(error.message);
      }

      return true;
    } catch (error) {
      // TODO: Display the error somehow in the UI
      throw redirect({
        to: "/auth/signin",
        search: {
          redirect: location.href,
        },
      });
    }
  },
});
