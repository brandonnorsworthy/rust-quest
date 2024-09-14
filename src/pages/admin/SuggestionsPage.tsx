import { useNavigate } from "react-router-dom";

import { useCallback, useEffect, useState } from "react";
import { toast } from "@/components/Toaster";
import suggestionService from "@/service/suggestionService";
import { useAuth } from "@/context/useAuth";
import withAuth from "@/hocs/withAuth";
import Table from "@/components/Table";
import Button from "@/components/Button";
import { Suggestion } from "@/models/SuggestionModels/suggestionResponse";

const SuggestionsPage = () => {
  const navigate = useNavigate();
  const { accessToken } = useAuth();
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [page, setPage] = useState(1);
  const maxLength = 20;

  const fetchSuggestions: () => Promise<void> = useCallback(async () => {
    try {
      const suggestionsResponse = await suggestionService.getSuggestions(accessToken!, page) as Suggestion[];
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
    <main className="h-screen overflow-scroll">
      <div className="p-8">
        <div className="absolute bottom-8 right-8">
          <Button type="confirm" text="done" onClick={() => navigate("/admin")} />
        </div>

        <div className="flex justify-center w-full mt-8">
          <h1 className="text-4xl font-bold text-white">All Suggestions</h1>
        </div>

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
    </main>
  );
}

const AuthenticatedSuggestionsPage = withAuth(SuggestionsPage, "admin");

export default AuthenticatedSuggestionsPage;