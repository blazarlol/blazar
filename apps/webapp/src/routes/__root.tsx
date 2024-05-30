import { Outlet, createRootRouteWithContext } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { AuthContext } from "../auth";

interface RouterContext {
  auth: AuthContext;
}

// TODO: Create context for the session.
export const Route = createRootRouteWithContext<RouterContext>()({
  component: () => (
    <>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
  beforeLoad: async ({ context }) => {
    const { loading } = context.auth;

    if (!loading) {
      return false;
    }

    return true;
  },
});
