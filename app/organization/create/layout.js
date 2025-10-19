import ProtectedRoute from "@/components/ProtectedRoute";

export default function Layout({ children }) {
  return (
    <ProtectedRoute>
      <div>{children}</div>
    </ProtectedRoute>
  );
}
