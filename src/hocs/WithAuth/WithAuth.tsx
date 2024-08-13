import React, { useEffect, useState, ComponentType } from "react";
import { useNavigate } from "react-router-dom";


// eslint-disable-next-line @typescript-eslint/no-empty-object-type
type WithAuthProps = {

};

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const ComponentWithAuth: React.FC<P & WithAuthProps> = (props) => {
    const navigate = useNavigate();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/"); //maybe propmt them to login? 
        return;
      }

      setIsAuthenticated(true);
    }, [navigate]);

    if (!isAuthenticated) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return ComponentWithAuth;
};

export default withAuth;