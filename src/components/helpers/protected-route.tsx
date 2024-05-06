import React, { useEffect, useState } from "react";
import { Navigate, Route, RouteProps } from "react-router-dom";

interface ProtectedRouteProps {
  isAuthenticated: boolean;
  authenticationPath: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  isAuthenticated,
  authenticationPath,
  ...routeProps
}) => {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      setIsAuthorized(true);
      setIsAuthenticating(false);
    } else {
      setIsAuthorized(false);
      setIsAuthenticating(false);
    }
  }, [isAuthenticated]);

  if (isAuthenticating) {
    return <div>Loading...</div>;
  }

  if (!isAuthorized) {
    return <Navigate to={authenticationPath} />;
  }

  return <Route {...routeProps} />;
};

export default ProtectedRoute;
