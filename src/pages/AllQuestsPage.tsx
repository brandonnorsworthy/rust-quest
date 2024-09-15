import Button from "@/components/Button";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "@/components/Table";
import questService from "@/service/questService";
import { useAuth } from "@/context/useAuth";
import { toast } from "@/components/Toaster";
import { AllQuestsResponse } from "@/models/QuestModels/questResponse";
import Modal from "@/components/Modal";
import ViewQuest from "@/modals/ViewQuest";
import userService from "@/service/userService";

const AllQuestsPage: React.FC = () => {
  const { accessToken } = useAuth();
  const navigate = useNavigate();
  const [suggestions, setSuggestions] = useState<AllQuestsResponse[]>([]);
  const [page, setPage] = useState(1);
  const maxLength = 20;
  const [selectedQuest, setSelectedQuest] = useState<AllQuestsResponse | null>(null);

  const fetchQuests: () => Promise<void> = useCallback(async () => {
    try {
      const suggestionsResponse = await questService.getQuests(accessToken!, page);
      setSuggestions(suggestionsResponse);
    } catch (error) {
      toast.error("Failed to get quests", error);
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

  const handleRowClick = (index: number) => {
    setSelectedQuest(suggestions[index]);
  }

  const closeModal = () => {
    setSelectedQuest(null);
  }

  const handleQuestComplete = async () => {
    if (!selectedQuest) return;
    try {
      await userService.completeQuest(accessToken!, selectedQuest.id);
      fetchQuests();
      toast.success("Quest completed successfully");
      closeModal();
    } catch (error) {
      toast.error("Failed to complete quest", error);
    }
  }

  const handleQuestIncomplete = async () => {
    if (!selectedQuest) return;
    try {
      await userService.incompleteQuest(accessToken!, selectedQuest.id);
      fetchQuests();
      toast.success("Quest marked incomplete successfully");
      closeModal();
    } catch (error) {
      toast.error("Failed to mark quest incomplete", error);
    }
  }

  return (
    <main className="h-screen overflow-hidden bg-secondary/50">
      <div className="p-8">
        <div className="absolute bottom-8 right-8">
          <Button type="confirm" text="done" onClick={() => navigate("/")} />
        </div>

        <div className="flex justify-center w-full mt-8">
          <h1 className="text-4xl font-bold text-white">All Quests</h1>
        </div>

        <Table
          data={suggestions}
          columns={[
            { header: "Title", accessor: "title" },
            { header: "Category", accessor: "category" },
            { header: "Description", accessor: "description" },
            { header: "completed", accessor: "completed" }
          ]}
          page={page}
          maxLength={maxLength}
          setPage={setPage}
          rowClick={handleRowClick}
        />
      </div>

      {
        selectedQuest &&
        <Modal onClose={closeModal}>
          <ViewQuest
            onClose={closeModal}
            quest={selectedQuest}
            {...(selectedQuest.completed
              ? { onIncomplete: handleQuestIncomplete }
              : { onComplete: handleQuestComplete })}
          />
        </Modal>
      }
    </main>
  );
}

export default AllQuestsPage;