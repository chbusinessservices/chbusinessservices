import { createFileRoute } from "@tanstack/react-router";
import { LoginScreen } from "~/components/lrd/LoginScreen";
import { pageHead } from "~/lib/seo";

export const Route = createFileRoute("/lrd/client-portal")({
  head: () =>
    pageHead({
      title: "Client Portal | CH Business Services",
      description: "Track your bookings, upload documents securely, and follow your request from booking to delivery.",
      ogType: "website",
    }),
  component: ClientPortal,
});

function ClientPortal() {
  return <LoginScreen />;
}
