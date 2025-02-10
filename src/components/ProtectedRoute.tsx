import React from "react";
import { Navigate } from "react-router-dom";

interface ProtectedRouteProps {
  element: JSX.Element;
  requiredRole: "buyer" | "seller"; 
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  element,
  requiredRole,
}) => {
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const isLoggedIn = user && user.name; 
  const hasCorrectRole = isLoggedIn && user.type === requiredRole;

  if (!isLoggedIn || !hasCorrectRole) {
    return <Navigate to="/" replace />;
  }

  return element;
};

export default ProtectedRoute;
