import { useNavigate } from "react-router-dom";

import MenuButton from "@/components/MenuButton"
import { useCallback, useEffect, useState } from "react";
import { toast } from "@/components/Toaster";
import suggestionService from "@/service/suggestionService";
import { useAuth } from "@/context/useAuth";
import withAuth from "@/hocs/withAuth";

interface Suggestion {
  id: string;
  username: string;
  title: string;
  description: string;
}

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
        <div className="absolute top-8 left-8">
          <MenuButton text="back to admin" onClick={() => navigate("/admin")} />
        </div>

        <div className="flex justify-center w-full mt-8">
          <h1 className="text-4xl font-bold text-white">All Suggestions</h1>
        </div>

        {
          suggestions.length === 0 ?
            <div className="flex justify-center w-full mt-8">
              <h1 className="text-2xl font-bold text-white">No suggestions</h1>
            </div> :
            <div className="flex flex-col items-center mt-8 text-xl">
              <table className="bg-white">
                <thead className="font-bold">
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Created By</th>
                  <th className="px-4 py-2">Title</th>
                  <th className="px-4 py-2">Description</th>
                </thead>

                <tbody>
                  {
                    suggestions.map((suggestion: Suggestion) => (
                      <tr className="bg-slate-100 even:bg-slate-200 hover:bg-white hover:cursor-pointer">
                        <td className="px-2 py-1">{suggestion.id}</td>
                        <td className="px-2 py-1">{suggestion.username}</td>
                        <td className="px-2 py-1">{suggestion.title}</td>
                        <td className="px-2 py-1">{suggestion.description}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>

              <div className="flex justify-center w-full gap-2 mt-8">
                <button
                  className="px-4 py-2 font-bold bg-white border rounded disabled:bg-white/50"
                  disabled={page === 1}
                  onClick={() => setPage((prevPage) => prevPage - 1)}
                >previous</button>
                <span
                  className="px-4 py-2 font-bold bg-white border rounded select-none">page: {page}</span>
                <button
                  className="px-4 py-2 font-bold bg-white border rounded disabled:bg-white/50"
                  disabled={suggestions.length < maxLength}
                  onClick={() => setPage((prevPage) => prevPage + 1)}
                >next</button>
              </div>
            </div>
        }
      </div>
    </main>
  );
}

const AuthenticatedSuggestionsPage = withAuth(SuggestionsPage, "admin");

export default AuthenticatedSuggestionsPage;