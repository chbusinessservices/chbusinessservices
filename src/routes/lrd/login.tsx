import { createFileRoute } from "@tanstack/react-router";
import { LoginScreen } from "~/components/lrd/LoginScreen";
import { pageHead } from "~/lib/seo";

export const Route = createFileRoute("/lrd/login")({
  head: () =>
    pageHead({
      title: "Log In | CH Business Services",
      description: "Log in to your CH Business Services account.",
      ogType: "website",
    }),
  component: Login,
});

function Login() {
  return <LoginScreen />;
}
