import React from "react";
import { Route, Navigate } from "react-router-dom";

interface AppRouteProps {
  path: string;
  element: React.ReactNode;
  isAuthenticated: boolean;
}

const AppRoute: React.FC<AppRouteProps> = ({
  path,
  element,
  isAuthenticated,
}) => {
  return isAuthenticated ? (
    <Route path={path} element={element} />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default AppRoute;
