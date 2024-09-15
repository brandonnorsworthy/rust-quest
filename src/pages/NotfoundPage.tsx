import React from "react";
import Button from "@/components/Button";
import { useNavigate } from "react-router-dom";

const NotfoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="flex flex-col p-4 rounded-md bg-secondary text-text">
        <h2 className="text-2xl font-bold">Error: 404</h2>
        <span className="py-2">Looks like you got lost</span>
        <Button
          type="confirm"
          onClick={() => navigate("/")}
        >
          confirm
        </Button>
      </div>
    </div>
  );
}

export default NotfoundPage;