import { role } from "@/models/AuthModels/userToken";
import React, { useLayoutEffect, useState, ComponentType } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/useAuth";
import Loader from "@/components/Loader";

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>, requiredRole?: role) => {
  const ComponentWithAuth: React.FC<P> = (props) => {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useLayoutEffect(() => {
      if (!user) {
        navigate("/login");
        return;
      }

      if (requiredRole && user.role !== requiredRole) {
        navigate("/unauthorized");
        return;
      }

      setIsAuthenticated(true);
    }, [navigate, user, requiredRole]);

    if (!isAuthenticated) {
      return <Loader />
    }

    return <WrappedComponent {...props} />;
  };

  return ComponentWithAuth;
};

export default withAuth;
