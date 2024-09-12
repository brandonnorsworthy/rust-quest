import { useNavigate } from "react-router-dom";

import MenuButton from "@/components/MenuButton"
import { useCallback, useEffect, useState } from "react";
import { toast } from "@/components/Toaster";
import suggestionService from "@/service/suggestionService";
import { useAuth } from "@/context/AuthenticationProvider";
import withAuth from "@/hocs/withAuth";

const SuggestionsPage = () => {
  const navigate = useNavigate();
  const { accessToken } = useAuth();
  const [suggestions, setSuggestions] = useState([]);

  const fetchSuggestions: () => Promise<void> = useCallback(async () => {
    try {
      const suggestionsResponse = await suggestionService.getSuggestions(accessToken!);
      setSuggestions(suggestionsResponse);
    } catch (error) {
      toast.error("Failed to get suggestions", error);
    }
  }, [accessToken]);

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
      return;
    }
    fetchSuggestions();
  }, [accessToken, navigate, fetchSuggestions]);

  return (
    <main className="h-screen overflow-hidden">
      <div className="p-8">
        <div className="absolute top-8 left-8">
          <MenuButton text="back to admin" onClick={() => navigate("/admin")} />
        </div>

        <div className="flex justify-center w-full">
          <h1 className="text-4xl font-bold text-white">Admin Suggestions</h1>
        </div>

        {
          suggestions.length === 0 ?
            <div className="flex justify-center w-full mt-8">
              <h1 className="text-2xl font-bold text-white">No suggestions</h1>
            </div> :
            <div className="flex flex-col items-center mt-8">
              {
                suggestions.map((suggestion: any) => (
                  <p>{JSON.stringify(suggestion)}</p>
                  // <div key={suggestion.id} className="flex flex-col items-center w-1/2 p-4 m-4 rounded-lg bg-white/10">
                  //   <p className="text-white">{suggestion.suggestion}</p>
                  //   {/* <p className="text-white">{suggestion.createdBy}</p> */}
                  // </div>
                ))
              }
            </div>
        }

      </div>
    </main>
  );
}

const AuthenticatedSuggestionsPage = withAuth(SuggestionsPage, "admin");

export default AuthenticatedSuggestionsPage;