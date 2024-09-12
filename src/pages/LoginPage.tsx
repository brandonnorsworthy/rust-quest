import { useNavigate } from "react-router-dom";

import LoginPanel from "@/components/LoginPanel";

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

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
