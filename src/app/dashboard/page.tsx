import type { Metadata } from "next";
import Dashboard from "@/tectonic/pages/Dashboard";
import ProtectedRoute from "@/tectonic/components/ProtectedRoute";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: {
    index: false,
    follow: false,
  },
};

export default function DashboardPage() {
  return (
    <ProtectedRoute requireAdmin>
      <Dashboard />
    </ProtectedRoute>
  );
}
