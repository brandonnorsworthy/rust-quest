import React from "react";
import Button from "@/components/Button";
import { useNavigate } from "react-router-dom";

const UnauthorizedPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="flex flex-col p-4 rounded-md bg-secondary text-text">
        <h2 className="text-2xl font-bold">Error: 429</h2>
        <span className="py-2">Hey, stay out of places your shouldn't be</span>
        <Button
          type="confirm"
          onClick={() => navigate("/")}>
          i concede
        </Button>
      </div>
    </div>
  );
}

export default UnauthorizedPage;