import { useNavigate } from "react-router-dom";

import { useCallback, useEffect, useState } from "react";
import { toast } from "@/components/Toaster";
import { useAuth } from "@/context/useAuth";
import withAuth from "@/hocs/withAuth";
import Table from "@/components/Table";
import Button from "@/components/Button";
import questService from "@/service/questService";
import { Quest } from "@/models/QuestModels/questResponse";
import Loader from "@/components/Loader";
import Modal from "@/components/Modal";
import EditQuest from "@/modals/EditQuest";
import categoryService from "@/service/categoryService";
import { Category } from "@/models/CategoryModels/categoryResponse";
import { AxiosError } from "axios";
import ConfirmDialog from "@/components/ConfirmDialog";
import { EditQuestRequest } from "@/models/QuestModels/questRequests";

const AdminQuestsPage = () => {
  const navigate = useNavigate();
  const { accessToken } = useAuth();

  const [quests, setQuests] = useState<Quest[]>([]);
  const [page, setPage] = useState(1);
  const [selectedQuest, setSelectedQuest] = useState<Quest | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [confirmDialog, setConfirmDialog] = useState<{ title: string; description: string; onConfirm: () => void; } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const maxLength = 20;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        if (!accessToken) return;

        const categoriesResponse = await categoryService.getCategories(accessToken);

        setCategories(categoriesResponse);
      } catch (error) {
        toast.error("Failed to get categories", error);
      }
    };

    fetchCategories();
  }, [accessToken]);

  const fetchQuests: () => Promise<void> = useCallback(async () => {
    try {
      if (!accessToken) return;
      setIsLoading(true);

      const questsResponse = await questService.getQuests(accessToken, page);

      setQuests(questsResponse);
    } catch (error) {
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
    setSelectedQuest(quests[index]);
  };

  const handleModalClose = () => {
    setSelectedQuest(null);
  }

  const handleDeleteQuest = async () => {
    if (!selectedQuest || !accessToken) return;

    const onConfirm = async () => {
      await questService.deleteQuest(accessToken, selectedQuest.id)
      fetchQuests();
    };

    setConfirmDialog({
      title: "Are you sure?",
      description: "If you delete this suggestion, you will lose all changes.",
      onConfirm: async () => {
        await onConfirm();
        setConfirmDialog(null);
      }
    });
  };

  const handleEditQuest = async (newQuest: EditQuestRequest) => {
    const editQuest = async () => {
      try {
        if (!selectedQuest) return;
        if (!accessToken) return;

        if (newQuest?.objectives) {
          newQuest.objectives = newQuest.objectives
            .filter((objective): objective is string => !(objective === ""));
        }

        await questService.editQuest(accessToken, selectedQuest.id, newQuest);
        fetchQuests();

        toast.success("Quest updated successfully");
        handleModalClose();
      } catch (error: unknown) {
        if (error instanceof AxiosError && error.response?.data) {
          return toast.error(error.response?.data.message, error);
        }
        toast.error("Failed to update quest", error);
      }
    }

    setConfirmDialog({
      title: "Are you sure?",
      description: "Overwrite the current quest with the new data",
      onConfirm: async () => {
        await editQuest();
        setConfirmDialog(null);
      }
    });
  };

  return (
    <main className="overflow-hidden h-dvh w-dvw">
      <div className="absolute h-dvh w-dvw overflow-hidden z-[-1] bg-secondary/50">
      </div>

      <div className="w-full h-full md:p-8">
        <div className="absolute top-4 left-4 md:top-8 md:left-4">
          <Button type="confirm" onClick={() => navigate("/admin")}>
            done
          </Button>
        </div>

        <div className="w-full h-full">
          <div className="flex items-end justify-center w-full h-1/6">
            <h1 className="text-4xl font-bold text-white">Admin All Quests</h1>
          </div>

          {
            isLoading ?
              <Loader /> :
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
                  rowClick={handleRowClick}
                  maxLength={maxLength}
                  setPage={setPage}
                />
              </div>
          }
        </div>
      </div>

      {
        selectedQuest &&
        <Modal onClose={handleModalClose}>
          <EditQuest
            quest={selectedQuest}
            onClose={handleModalClose}
            categories={categories}
            onEditQuest={handleEditQuest}
            onDeleteQuest={handleDeleteQuest}
          />
        </Modal>
      }

      {
        confirmDialog &&
        <Modal
          onClose={() => setConfirmDialog(null)}
        >
          <ConfirmDialog
            title={confirmDialog.title}
            description={confirmDialog.description}
            onConfirm={confirmDialog.onConfirm}
            onCancel={() => setConfirmDialog(null)}
          />
        </Modal>
      }
    </main>
  );
}

const AuthenticatedAdminQuestsPage = withAuth(AdminQuestsPage, "admin");

export default AuthenticatedAdminQuestsPage;