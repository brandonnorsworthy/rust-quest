import { useNavigate } from "react-router-dom";

import LoginPanel from "@/components/LoginPanel";
import Background from "@/components/Background";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <main className="h-screen overflow-hidden">
      <LoginPanel
        onLoginSuccess={() => navigate("/")}
        onRegistrationSuccess={() => navigate("/")}
      />

      <Background />
    </main>
  );
}

export default LoginPage;
