import { Outlet, createFileRoute, redirect } from "@tanstack/react-router";

import { useAuth } from "../../auth";

const AuthLayout = () => {
  const { loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <Outlet />
    </div>
  );
};

export const Route = createFileRoute("/auth/_layout")({
  component: AuthLayout,
  beforeLoad: async ({ context }) => {
    const { session, loading } = context.auth;

    if (!loading && session) {
      throw redirect({
        to: "/",
      });
    }
  },
});
