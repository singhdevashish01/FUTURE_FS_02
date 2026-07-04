import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem("leadflowAuth") === "true";
  const token = localStorage.getItem("leadflowToken");

  if (!isAuthenticated || !token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;