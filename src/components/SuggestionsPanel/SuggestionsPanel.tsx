import React, { useState } from "react";

import CreateSuggestionRequest from "@/models/SuggestionModels/CreateSuggestionRequest";
import suggestionService from "@/service/suggestionService";
import useAuth from "@/hooks/useAuth";
import { toast } from "../Toaster";
import { AxiosError } from "axios";

type SuggestionsPanelProps = {
  onClose: () => void;
};

const SuggestionsPanel: React.FC<SuggestionsPanelProps> = (props) => {
  const {
    onClose,
  } = props;
  const { accessToken } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;

    try {
      const newSuggestion = {
        title: (form.elements.namedItem("title") as HTMLInputElement).value,
        description: (form.elements.namedItem("description") as HTMLTextAreaElement).value,
      } as CreateSuggestionRequest;

      await suggestionService.createSuggestion(newSuggestion, accessToken!);
      toast.success("Suggestion submitted successfully!");
      onClose();
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response) {
        setError(error.response.data.error);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="w-full max-w-md p-4 rounded-md shadow-lg bg-slate-100">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-muted-foreground">Suggestions</h2>
          <p className="text-sm text-gray-600">
            Suggest a quest or feature
          </p>
        </div>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="p-2">
            <label htmlFor="title" className="sr-only">Title</label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="Title"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="p-2">
            <label htmlFor="description" className="sr-only">Suggestion</label>
            <textarea
              id="description"
              name="description"
              placeholder="Details of Suggestion, if this is a quest, please include the quest details and potential objectives"
              className="w-full p-2 border border-gray-300 rounded-md"
            />
          </div>

          {
            error &&
            <div className="text-sm text-red-500 text-end">
              {error}
            </div>
          }

          <div className="flex justify-end mt-2 space-x-2">
            <button
              type="button"
              className="p-2 transition-colors rounded-md text-slate-500 hover:bg-slate-400 hover:text-white"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="p-2 text-white transition-colors rounded-md bg-slate-500 hover:bg-slate-400"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SuggestionsPanel;