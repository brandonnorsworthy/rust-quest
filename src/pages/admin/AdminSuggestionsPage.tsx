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
import ViewSuggestion from "@/modals/ViewSuggestions";
import categoryServices from "@/service/categoryServices";
import { Category } from "@/models/CategoryModels/categoryResponse";
import ConfirmDialog from "@/components/ConfirmDialog";
import { convertSuggestionIntoQuestBodyRequest } from "@/models/SuggestionModels/suggestionRequests";

const AdminSuggestionsPage = () => {
  const navigate = useNavigate();
  const { accessToken } = useAuth();
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [page, setPage] = useState(1);
  const maxLength = 20;
  const [selectedSuggestion, setSelectedSuggestion] = useState<Suggestion | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [confirmDialog, setConfirmDialog] = useState<{ title: string; description: string; onConfirm: () => void; } | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        if (!accessToken) return;

        const categoriesResponse = await categoryServices.getCategories(accessToken);
        setCategories(categoriesResponse);
      } catch (error) {
        toast.error("Failed to get categories", error);
      }
    };

    fetchCategories();
  }, []);

  const fetchSuggestions: () => Promise<void> = useCallback(async () => {
    try {
      if (!accessToken) return;

      const suggestionsResponse = await suggestionService.getSuggestions(accessToken, page);

      setSuggestions(suggestionsResponse);
    } catch (error) {
      toast.error("Failed to get suggestions", error);
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
    if (confirmDialog) return;

    setConfirmDialog({
      title: "Are you sure?",
      description: "If you close this suggestion, you will lose all changes.",
      onConfirm: () => {
        closeModal();
        setConfirmDialog(null);
      }
    })
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
            <h1 className="text-4xl font-bold text-white">All Suggestions</h1>
          </div>

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
        </div>
      </div>

      {
        selectedSuggestion &&
        <Modal onClose={handleCloseSuggestion}>
          <ViewSuggestion
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