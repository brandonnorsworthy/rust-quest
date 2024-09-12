import React, { useEffect, useState, ComponentType } from "react";
import { useNavigate } from "react-router-dom";

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>, requiredRole?: "admin") => {
  const ComponentWithAuth: React.FC<P> = (props) => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [userRole, setUserRole] = useState<string | null>(null);

    useEffect(() => {
      const token = localStorage.getItem("token");
      const role = localStorage.getItem("role"); // Assuming the role is stored in local storage
      if (!token) {
        navigate("/login");
        return;
      }

      setIsAuthenticated(true);
      setUserRole(role);
    }, [navigate]);

    if (!isAuthenticated) {
      return null;
    }

    if (requiredRole && userRole !== requiredRole) {
      navigate("/unauthorized");
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return ComponentWithAuth;
};

export default withAuth;
