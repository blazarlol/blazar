import { apiTreaty } from "@blazar/elysia";
import { createFileRoute, redirect } from "@tanstack/react-router";

const Index = () => {
  return <div>Hello /onboarding/_layout/account-info!</div>;
};

export const Route = createFileRoute("/onboarding/_layout/account-info")({
  component: Index,
  beforeLoad: async ({ context }) => {
    const { loading, user } = context.auth;

    if (loading) {
      return;
    }

    if (!user) {
      throw redirect({
        to: "/auth/signin",
      });
    }

    const { data: accountData, error: accountError } = await apiTreaty.api
      .account({ userId: user.id })
      .get();

    if (accountError) {
      throw redirect({
        to: "/auth/signin",
      });
    }

    if (accountData.account) {
      throw redirect({
        to: "/onboarding/subscription-plan",
      });
    }

    return true;
  },
});
