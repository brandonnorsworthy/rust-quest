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
      //make it not random
      const status = Math.random() > 0.3;
      console.log(status);
      if (status) {
        console.log("Authenticated");
        setIsAuthenticated(true);
      } else {
        console.log("Not Authenticated");
        navigate("/");
      }
    }, [navigate]);

    if (!isAuthenticated) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return ComponentWithAuth;
};

export default withAuth;