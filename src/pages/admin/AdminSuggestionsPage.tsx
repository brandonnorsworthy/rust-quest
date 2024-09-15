import { useNavigate } from "react-router-dom";

import { useCallback, useEffect, useState } from "react";
import { toast } from "@/components/Toaster";
import suggestionService from "@/service/suggestionService";
import { useAuth } from "@/context/useAuth";
import withAuth from "@/hocs/withAuth";
import Table from "@/components/Table";
import Button from "@/components/Button";
import { Suggestion } from "@/models/SuggestionModels/suggestionResponse";

const AdminSuggestionsPage = () => {
  const navigate = useNavigate();
  const { accessToken } = useAuth();
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [page, setPage] = useState(1);
  const maxLength = 20;

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
    if (!accessToken) {
      navigate("/login");
      return;
    }
    fetchSuggestions();
  }, [accessToken, navigate, fetchSuggestions]);

  useEffect(() => {
    fetchSuggestions();
  }, [page, fetchSuggestions]);

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
                { header: "Created By", accessor: "username" },
                { header: "Title", accessor: "title" },
                { header: "Description", accessor: "description" }
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

const AuthenticatedAdminSuggestionsPage = withAuth(AdminSuggestionsPage, "admin");

export default AuthenticatedAdminSuggestionsPage;