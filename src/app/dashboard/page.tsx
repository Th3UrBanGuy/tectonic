"use client";

import Dashboard from "@/tectonic/pages/Dashboard";
import ProtectedRoute from "@/tectonic/components/ProtectedRoute";

export default function DashboardPage() {
  return (
    <ProtectedRoute requireAdmin>
      <Dashboard />
    </ProtectedRoute>
  );
}
