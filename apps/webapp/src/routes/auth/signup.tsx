import { createFileRoute } from "@tanstack/react-router";
import { TextInput } from "../../components/ui/text-input";

const Index = () => {
  return (
    <div>
      <TextInput placeholder="test" />
    </div>
  );
};

export const Route = createFileRoute("/auth/signup")({
  component: Index,
});
