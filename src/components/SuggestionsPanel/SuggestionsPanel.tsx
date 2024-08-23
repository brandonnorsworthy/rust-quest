import React, { useEffect, useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useMutation } from "@tanstack/react-query";

import CreateSuggestionRequest from "@/models/SuggestionModels/CreateSuggestionRequest";
import suggestionService from "@/service/suggestionService";
import useAuth from "@/hooks/useAuth";

const SuggestionsPanel = () => {
  const [open, setOpen] = useState(false);
  const [suggestion, setSuggestion] = useState("");
  const [title, setTitle] = useState("");

  const { accessToken } = useAuth();

  const mutation = useMutation({
    mutationFn: (newSuggestion: CreateSuggestionRequest) => {
      return suggestionService.createSuggestion(newSuggestion, accessToken);
    },
    onSuccess: () => {
      setOpen(false);
    },
  });

  useEffect(() => {
    if (!open) {
      setTitle("");
      setSuggestion("");
    }
  }, [open]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    mutation.mutateAsync({ title, description: suggestion });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          className=""
          onClick={() => setOpen(true)}
        >
          SUGGESTIONS
        </button>
      </DialogTrigger>
      <DialogContent
        className="bg-slate-100"
        onCloseAutoFocus={(event) => {
          event.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle className='text-muted-foreground'>Suggestions</DialogTitle>
          <DialogDescription>
            Suggest a quest or feature for the app
          </DialogDescription>
        </DialogHeader>
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <div className="p-2">
            <label htmlFor="title" className="sr-only">
              Title"
            </label>
            <Input
              id="title"
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="p-2">
            <label htmlFor="suggestion" className="sr-only">
              Suggestion
            </label>
            <Textarea
              id="suggestion"
              placeholder="Suggestion"
              value={suggestion}
              onChange={(e) => setSuggestion(e.target.value)}
            />
          </div>
          {
            mutation.isError && (
              <span className="pb-2 text-red-500 text-end">
                {mutation.error?.message}
              </span>
            )
          }
          <DialogFooter>
            <button
              className="p-2 transition-colors rounded-md text-slate-500 hover:bg-slate-400 hover:text-white"
              onClick={() => setOpen(false)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="p-2 text-white transition-colors rounded-md bg-slate-500 hover:bg-slate-400"
            >
              {mutation.isPending ? "Submitting..." : "Submit"}
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default SuggestionsPanel;