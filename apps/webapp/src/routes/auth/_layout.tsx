import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";
import { validateSessionCookie } from "../../utils/session";
import { getAuthSessionCookie } from "@blazar/helpers";
import { apiTreaty } from "@blazar/elysia";

const AuthLayout = () => {
  return (
    <div>
      Hello /auth/_layout!
      <Outlet />
    </div>
  );
};

export const Route = createFileRoute("/auth/_layout")({
  component: AuthLayout,
  beforeLoad: async () => {
    const authSessionCookie = getAuthSessionCookie("auth_session");

    if (!authSessionCookie) {
      return;
    }

    const { error } = await apiTreaty.api.auth["validate-session"].post({
      sessionId: authSessionCookie,
    });

    if (error) {
      return;
    }

    throw redirect({
      to: "/",
    });
  },
});
