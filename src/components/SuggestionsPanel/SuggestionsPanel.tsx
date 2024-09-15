import React, { useEffect, useRef } from "react";

import CreateSuggestionRequest from "@/models/SuggestionModels/CreateSuggestionRequest";
import suggestionService from "@/service/suggestionService";
import { toast } from "../Toaster";
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
  const panelRef = useRef<HTMLDivElement>(null);

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
        toast.error(error.response.data.error);
      } else {
        toast.error("An unexpected error occurred.");
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
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div ref={panelRef} className="w-full max-w-md p-2 rounded-md shadow-lg bg-secondary">
        <div className="p-2 text-text">
          <h2 className="text-lg font-semibold text-muted-foreground">Suggestions</h2>
          <p className="text-sm text-text-secondary">Suggest a quest or feature, if you are suggesting a quest please include examples of the objectives</p>
        </div>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="mt-4">
            <label htmlFor="title" className="sr-only">Title</label>
            <input
              id="title"
              name="title"
              type="text"
              placeholder="Title"
              className="w-full p-2 font-semi text-text bg-white/25 placeholder:text-text/50"
            />
          </div>
          <div className="mt-4">
            <label htmlFor="description" className="sr-only">Suggestion</label>
            <textarea
              id="description"
              name="description"
              placeholder="Details of Suggestion"
              className="w-full p-2 rounded-md resize-none font-semi text-text placeholder:text-text/50 bg-white/25"
            />
          </div>

          <div className="flex justify-between mt-2 space-x-2">
            <Button
              text="cancel"
              htmlType="button"
              onClick={onClose}
            />
            <Button
              text="submit"
              htmlType="submit"
              type="confirm"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default SuggestionsPanel;