import { useNavigate } from "react-router-dom";

import MenuButton from "../components/MenuButton"
import MenuSpacer from "../components/MenuSpacer"

import logoImg from '../assets/placeholder-logo.png'
import questService from "@/service/questService";
import { Quest } from "@/models/QuestModels/questResponse";
import { useEffect, useState } from "react";
import QuestModal from "@/components/QuestModal";
import userService from "@/service/userService";
import { toast } from "@/components/Toaster";
import SuggestionsPanel from "@/components/SuggestionsPanel";
import { useAuth } from "@/context/useAuth";

const LandingPage = () => {
  const { accessToken, clearToken, user } = useAuth();
  const navigate = useNavigate();

  const storedQuests = localStorage.getItem('currentQuest') ? JSON.parse(localStorage.getItem('currentQuest') as string) : null;
  const [currentQuest, setCurrentQuest] = useState<Quest | null>(storedQuests);
  const [isQuestModalOpen, setIsQuestModalOpen] = useState(false);
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);

  useEffect(() => {
    if (!currentQuest) {
      setIsQuestModalOpen(false);
    };
  }, [currentQuest]);

  const handleOpenCurrentQuest = () => {
    if (!accessToken) return navigate("/login");

    setIsQuestModalOpen(true);
  };

  const handleSpinWheel = async () => {
    if (!accessToken) return navigate("/login");

    try {
      const randomQuestResponse = await questService.getRandomQuest(accessToken);

      if (!randomQuestResponse) {
        toast.warning("No quests available, check filters or you completed them all");
        return;
      }

      setCurrentQuest(randomQuestResponse);
      setIsQuestModalOpen(true);
      localStorage.setItem('currentQuest', JSON.stringify(randomQuestResponse));
    } catch (error) {
      toast.error("Failed to get random quest", error);
    }
  };

  const handleQuestSkip = () => {
    setCurrentQuest(null);
    localStorage.removeItem('currentQuest');
  };

  const handleQuestComplete = async () => {
    if (!accessToken) return navigate("/login");

    try {
      await userService.completeQuest(accessToken, currentQuest!.id);

      setCurrentQuest(null);
      localStorage.removeItem('currentQuest');
      toast.success("Quest completed");
    } catch (error) {
      toast.error("Failed to complete quest", error);
    }
  };

  return (
    <main className="flex justify-center w-full h-screen overflow-hidden">
      <div className="flex flex-col xl:max-w-[86rem] items-start mt-1 w-full ml-2 text-5xl sm:mt-10 sm:ml-10 text-white/50">
        <img src={logoImg} alt="logo" className="h-36 md:h-32" />

        <div className="flex flex-col items-start mt-20">
          {
            currentQuest ?
              <MenuButton text="current quest" onClick={handleOpenCurrentQuest} /> :
              <MenuButton text="SPIN WHEEL" onClick={handleSpinWheel} />
          }
          <MenuSpacer />

          <MenuButton text="NEWS" onClick={undefined} />
          <MenuButton text="completed quests" onClick={undefined} />
          <MenuButton text="SUGGESTIONS" onClick={() => setIsSuggestionsOpen(true)} />
          <MenuSpacer />

          <MenuButton text="SETTINGS" onClick={undefined} />
          {
            user && user.role === "admin" &&
            <MenuButton text="ADMIN" onClick={() => navigate("/admin")} />
          }
          <MenuSpacer />

          {
            !accessToken ?
              <MenuButton text="LOGIN" onClick={() => navigate("/login")} /> :
              <MenuButton text="LOGOUT" onClick={clearToken} />
          }
        </div>
      </div>

      {
        (isQuestModalOpen && currentQuest) &&
        <QuestModal
          onClose={() => setIsQuestModalOpen(false)}
          onSkip={handleQuestSkip}
          onComplete={handleQuestComplete}
          isOpen={isQuestModalOpen}
          imageUrl={currentQuest.image_url}
          title={currentQuest.title}
          category={currentQuest.category}
          description={currentQuest.description}
          objectives={currentQuest.objectives}
          infoUrl={currentQuest.info_url}
        />
      }

      {
        isSuggestionsOpen &&
        <SuggestionsPanel
          onClose={() => setIsSuggestionsOpen(false)}
        />
      }
    </main>
  );
}

export default LandingPage;