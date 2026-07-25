import { createFileRoute, Outlet, redirect, useLocation } from "@tanstack/react-router";
import { checkAuth } from "~/lib/auth";
import { AdminLayout } from "~/components/AdminLayout";

export const Route = createFileRoute("/admin")({
  beforeLoad: async ({ location }) => {
    // Don't protect the login page itself
    if (location.pathname === "/admin/login") {
      return;
    }

    try {
      const { authenticated } = await checkAuth();
      if (!authenticated) {
        throw redirect({ to: "/admin/login" });
      }
    } catch (err) {
      // If checkAuth threw (e.g., during client-side nav), redirect to login
      if (err instanceof Error && err.message === "redirect") throw err;
      throw redirect({ to: "/admin/login" });
    }
  },
  component: AdminRoute,
});

function AdminRoute() {
  const location = useLocation();

  // Login page is standalone — no admin chrome
  if (location.pathname === "/admin/login") {
    return <Outlet />;
  }

  return (
    <AdminLayout currentPath={location.pathname}>
      <Outlet />
    </AdminLayout>
  );
}
