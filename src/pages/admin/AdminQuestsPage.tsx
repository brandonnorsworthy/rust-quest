import { useNavigate } from "react-router-dom";

import { useCallback, useEffect, useState } from "react";
import { toast } from "@/components/Toaster";
import { useAuth } from "@/context/useAuth";
import withAuth from "@/hocs/withAuth";
import Table from "@/components/Table";
import Button from "@/components/Button";
import questService from "@/service/questService";
import { Quest } from "@/models/QuestModels/questResponse";

const AdminQuestsPage = () => {
  const navigate = useNavigate();
  const { accessToken } = useAuth();
  const [quests, setQuests] = useState<Quest[]>([]);
  const [page, setPage] = useState(1);
  const maxLength = 20;

  const fetchQuests: () => Promise<void> = useCallback(async () => {
    try {
      if (!accessToken) return;
      const questsResponse = await questService.getQuests(accessToken, page);
      setQuests(questsResponse);
    } catch (error) {
      toast.error("Failed to get suggestions", error);
    }
  }, [accessToken, page]);

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
      return;
    }
    fetchQuests();
  }, [accessToken, navigate, fetchQuests]);

  useEffect(() => {
    fetchQuests();
  }, [page, fetchQuests]);

  return (
    <main className="h-dvh w-dvw">
      <div className="absolute h-dvh w-dvw overflow-hidden z-[-1] bg-secondary/50">
      </div>

      <div className="w-full h-full p-8">
        <div className="absolute top-8 left-8">
          <Button type="confirm" onClick={() => navigate("/admin")}>
            done
          </Button>
        </div>

        <div className="w-full h-full">
          <div className="flex items-center justify-center w-full h-1/6">
            <h1 className="text-4xl font-bold text-white">Viewing All Quests</h1>
          </div>

          <div className="w-full h-5/6">
            <Table
              data={quests}
              columns={[
                { header: "ID", accessor: "id" },
                { header: "Title", accessor: "title" },
                { header: "Description", accessor: "description" },
                { header: "category", accessor: "category" },
              ]}
              page={page}
              maxLength={maxLength}
              setPage={setPage}
            />
          </div>
        </div>
      </div>
    </main>
  );
}

const AuthenticatedAdminQuestsPage = withAuth(AdminQuestsPage, "admin");

export default AuthenticatedAdminQuestsPage;