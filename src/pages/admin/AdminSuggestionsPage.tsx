import { useNavigate } from "react-router-dom";

import { useCallback, useEffect, useState } from "react";
import { toast } from "@/components/Toaster";
import suggestionService from "@/service/suggestionService";
import { useAuth } from "@/context/useAuth";
import withAuth from "@/hocs/withAuth";
import Table from "@/components/Table";
import Button from "@/components/Button";
import { Suggestion } from "@/models/SuggestionModels/suggestionResponse";
import { AxiosError } from "axios";
import Modal from "@/components/Modal";
import EditSuggestion from "@/modals/EditSuggestions";
import categoryService from "@/service/categoryService";
import { Category } from "@/models/CategoryModels/categoryResponse";
import ConfirmDialog from "@/components/ConfirmDialog";
import { convertSuggestionIntoQuestBodyRequest } from "@/models/SuggestionModels/suggestionRequests";
import Loader from "@/components/Loader";

const AdminSuggestionsPage = () => {
  const navigate = useNavigate();
  const { accessToken } = useAuth();

  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [page, setPage] = useState(1);
  const [selectedSuggestion, setSelectedSuggestion] = useState<Suggestion | null>(null);
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

  const fetchSuggestions: () => Promise<void> = useCallback(async () => {
    try {
      if (!accessToken) return;
      setIsLoading(true);

      const suggestionsResponse = await suggestionService.getSuggestions(accessToken, page);

      setSuggestions(suggestionsResponse);
    } catch (error) {
      toast.error("Failed to get suggestions", error);
    } finally {
      setIsLoading(false);
    }
  }, [accessToken, page]);

  useEffect(() => {
    fetchSuggestions();
  }, [page, fetchSuggestions]);

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
      return;
    }
    fetchSuggestions();
  }, [accessToken, navigate, fetchSuggestions]);

  const handleRowClick = (index: number) => {
    setSelectedSuggestion(suggestions[index]);
  }

  const closeModal = () => {
    setSelectedSuggestion(null);
  }

  const handleCloseSuggestion = async () => {
    closeModal();
  };

  const handleDeleteSuggestion = async () => {
    const onConfirm = () => toast.info('not implemented yet');
    setConfirmDialog({
      title: "Are you sure?",
      description: "If you delete this suggestion, you will lose all changes.",
      onConfirm: () => {
        onConfirm();
        setConfirmDialog(null);
      }
    });
  };

  const handleCreateQuest = async (newQuest: convertSuggestionIntoQuestBodyRequest) => {
    const handleConvertSuggestionToQuest = async () => {
      try {
        if (!selectedSuggestion) return;
        if (!accessToken) return;

        await suggestionService.convertSuggestionIntoQuest(accessToken, selectedSuggestion.id, newQuest);
        fetchSuggestions();

        toast.success("Suggestion converted to quest");
        closeModal();
      } catch (error: unknown) {
        if (error instanceof AxiosError && error.response?.data) {
          return toast.error(error.response?.data.message, error);
        }
        toast.error("Failed to convert suggestion to quest", error);
      }
    }

    setConfirmDialog({
      title: "Are you sure?",
      description: "If you create a quest, suggestion will be deleted.",
      onConfirm: async () => {
        await handleConvertSuggestionToQuest();
        setConfirmDialog(null);
      }
    });
  };

  return (
    <main className="overflow-hidden h-dvh w-dvw">
      <div className="absolute h-dvh w-dvw overflow-hidden z-[-1] bg-secondary/50">
      </div>

      <div className="w-full h-full p-2 md:p-8">
        <div className="absolute top-4 left-4 md:top-8 md:left-8">
          <Button type="confirm" onClick={() => navigate("/admin")}>
            done
          </Button>
        </div>

        <div className="w-full h-full">
          <div className="flex items-end justify-center w-full h-1/6">
            <h1 className="text-4xl font-bold text-white">Admin All Suggestions</h1>
          </div>

          {
            isLoading ?
              <Loader /> :
              <div className="w-full h-5/6">
                <Table
                  data={suggestions}
                  columns={[
                    { header: "ID", accessor: "id" },
                    { header: "Title", accessor: "title" },
                    { header: "Description", accessor: "description" },
                  ]}
                  page={page}
                  maxLength={maxLength}
                  rowClick={handleRowClick}
                  setPage={setPage}
                />
              </div>
          }
        </div>
      </div>

      {
        selectedSuggestion &&
        <Modal onClose={handleCloseSuggestion}>
          <EditSuggestion
            onClose={handleCloseSuggestion}
            suggestion={selectedSuggestion}
            onCreateQuest={handleCreateQuest}
            onDeleteSuggestion={handleDeleteSuggestion}
            categories={categories}
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

const AuthenticatedAdminSuggestionsPage = withAuth(AdminSuggestionsPage, "admin");

export default AuthenticatedAdminSuggestionsPage;