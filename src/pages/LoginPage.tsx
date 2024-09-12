import { useNavigate } from "react-router-dom";

import LoginPanel from "@/components/LoginPanel";
import { useAuth } from "@/context/useAuth";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { accessToken } = useAuth();

  if (accessToken) {
    navigate("/");
    return null;
  }

  return (
    <main className="h-screen overflow-hidden">
      <LoginPanel
        onLoginSuccess={() => navigate("/")}
        onRegistrationSuccess={() => navigate("/")}
      />
    </main>
  );
}

export default LoginPage;
