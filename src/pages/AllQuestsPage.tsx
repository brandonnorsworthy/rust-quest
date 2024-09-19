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
import { AxiosError } from "axios";
import Loader from "@/components/Loader";

const AllQuestsPage: React.FC = () => {
  const { accessToken } = useAuth();
  const navigate = useNavigate();

  const [quest, setSuggestions] = useState<AllQuestsResponse[]>([]);
  const [page, setPage] = useState(1);
  const [selectedQuest, setSelectedQuest] = useState<AllQuestsResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const maxLength = 20;

  const fetchQuests: () => Promise<void> = useCallback(async () => {
    try {
      if (!accessToken) return;
      const suggestionsResponse = await questService.getQuests(accessToken, page);
      setSuggestions(suggestionsResponse);
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response?.data) {
        return toast.error(error.response.data, error);
      }
      toast.error("Failed to get quests", error);
    } finally {
      setIsLoading(false);
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
    setSelectedQuest(quest[index]);
  }

  const closeModal = () => {
    setSelectedQuest(null);
  }

  const handleQuestComplete = async () => {
    if (!selectedQuest) return;
    try {
      if (!accessToken) return;
      await userService.completeQuest(accessToken, selectedQuest.id);
      fetchQuests();
      toast.success("Quest completed successfully");
      closeModal();
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return toast.error(error.response?.data.message, error);
      }
      toast.error("Failed to complete quest", error);
    }
  }

  const handleQuestIncomplete = async () => {
    if (!selectedQuest) return;
    try {
      if (!accessToken) return;
      await userService.incompleteQuest(accessToken, selectedQuest.id);
      fetchQuests();
      toast.success("Quest marked incomplete successfully");
      closeModal();
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        return toast.error(error.response?.data.message, error);
      }
      toast.error("Failed to mark quest incomplete", error);
    }
  }

  return (
    <main className="h-dvh w-dvw">
      <div className="absolute h-dvh w-dvw overflow-hidden z-[-1] bg-secondary/50">
      </div>

      <div className="w-full h-full p-8">
        <div className="absolute top-8 left-8">
          <Button
            type="confirm"
            onClick={() => navigate("/")}
          >
            done
          </Button>
        </div>

        <div className="w-full h-full">
          <div className="flex items-center justify-center w-full h-1/6">
            <h1 className="text-4xl font-bold text-white">All Quests</h1>
          </div>

          {
            isLoading ?
              <Loader /> :
              <div className="w-full h-5/6">
                <Table
                  data={quest}
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
          }
        </div>
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