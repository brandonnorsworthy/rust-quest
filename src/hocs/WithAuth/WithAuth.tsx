import { UserToken } from "@/models/AuthModels/userToken";
import React, { useEffect, useState, ComponentType } from "react";
import { useNavigate } from "react-router-dom";

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>, requiredRole?: "admin") => {
  const ComponentWithAuth: React.FC<P> = (props) => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [user, setUser] = useState<UserToken | null>(null);

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      setUser({ ...JSON.parse(atob(token.split(".")[1])) });
      setIsAuthenticated(true);
    }, [navigate]);

    if (!isAuthenticated || !user) {
      return null;
    }

    if (requiredRole && user.role !== requiredRole) {
      navigate("/unauthorized");
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return ComponentWithAuth;
};

export default withAuth;
