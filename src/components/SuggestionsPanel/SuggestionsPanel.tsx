import React, { useEffect, useRef, useState } from "react";

import CreateSuggestionRequest from "@/models/SuggestionModels/CreateSuggestionRequest";
import suggestionService from "@/service/suggestionService";
import { AxiosError } from "axios";
import { useAuth } from "@/context/useAuth";
import Button from "../Button";

type SuggestionsPanelProps = {
  onClose: () => void;
};

const SuggestionsPanel: React.FC<SuggestionsPanelProps> = (props) => {
  const {
    onClose,
  } = props;
  const { accessToken } = useAuth();
  const [error, setError] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;

    try {
      const newSuggestion = {
        title: (form.elements.namedItem("title") as HTMLInputElement).value,
        description: (form.elements.namedItem("description") as HTMLTextAreaElement).value,
      } as CreateSuggestionRequest;

      if (!newSuggestion.title || !newSuggestion.description) {
        setError("Please enter a title and description.");
        return;
      }

      newSuggestion.title = newSuggestion.title.trim();
      newSuggestion.description = newSuggestion.description.trim();

      await suggestionService.createSuggestion(newSuggestion, accessToken!);
      setError("Suggestion submitted successfully!");
      onClose();
    } catch (error: unknown) {
      if (error instanceof AxiosError && error.response) {
        setError(error.response.data.error);
      } else {
        setError("An unexpected error occurred.");
      }
    }
  };

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div ref={panelRef} className="w-full max-w-md p-2 shadow-lg bg-secondary">
        <div className="p-2 text-text">
          <h2 className="text-lg font-semibold text-muted-foreground">Suggestions</h2>
          <p className="mt-2 text-sm text-text-secondary">Suggest a quest or feature, if you are suggesting a quest please include examples of the objectives</p>
        </div>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <label htmlFor="title" className="sr-only">Title</label>
          <input
            id="title"
            name="title"
            type="text"
            placeholder="Title"
            className="w-full p-2 mt-2 font-semi text-text bg-white/25 placeholder:text-text/50"
          />

          <label htmlFor="description" className="sr-only">Suggestion</label>
          <textarea
            id="description"
            name="description"
            placeholder="Details of Suggestion"
            className="w-full p-2 mt-2 resize-none font-semi text-text placeholder:text-text/50 bg-white/25"
          />

          {
            error ?
              <div className="w-full mt-2 text-red-500 text-end">
                {error}
              </div> :
              <div className="w-full mt-2 text-red-500 text-end">
                &nbsp;
              </div>
          }

          <div className="flex justify-between mt-2">
            <Button
              htmlType="button"
              onClick={onClose}
            >
              cancel
            </Button>
            <Button
              htmlType="submit"
              type="confirm"
            >
              submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SuggestionsPanel;