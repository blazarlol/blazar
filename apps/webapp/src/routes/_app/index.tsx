import {
  createFileRoute,
  redirect,
  Link,
  useRouter,
} from "@tanstack/react-router";
import { useAuth } from "../../auth";

const Index = () => {
  const { user, signOut } = useAuth();

  return (
    <>
      <div>Hello{user?.id}!</div>

      <Link to="/auth/signin" onClick={signOut}>
        SignOut
      </Link>
    </>
  );
};

export const Route = createFileRoute("/_app/")({
  component: Index,
});
