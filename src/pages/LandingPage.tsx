import { useNavigate } from "react-router-dom";

import MenuButton from "../components/MenuButton"
import MenuSpacer from "../components/MenuSpacer"

import logoImg from '../assets/placeholder-logo.png'
import useAuth from "@/hooks/useAuth";
import Background from "@/components/Background";
import questService from "@/service/questService";
import { Quest } from "@/models/QuestModels/questResponse";
import { useEffect, useState } from "react";
import QuestModal from "@/components/QuestModal";

const LandingPage = () => {
  const { accessToken, clearToken, user } = useAuth();
  const navigate = useNavigate();

  const storedQuests = localStorage.getItem('currentQuest') ? JSON.parse(localStorage.getItem('currentQuest') as string) : null;
  const [currentQuest, setCurrentQuest] = useState<Quest | null>(storedQuests);
  const [isQuestModalOpen, setIsQuestModalOpen] = useState(false);

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

    const randomQuestResponse = await questService.getRandomQuest(accessToken);

    setCurrentQuest(randomQuestResponse);
    setIsQuestModalOpen(true);
    localStorage.setItem('currentQuest', JSON.stringify(randomQuestResponse));
  };

  const handleQuestSkip = () => {
    setCurrentQuest(null);
    localStorage.removeItem('currentQuest');
  };

  const handleQuestComplete = () => {
    setCurrentQuest(null);
    localStorage.removeItem('currentQuest');
  };

  return (
    <main className="h-screen overflow-hidden">
      <div className="flex flex-col items-start mt-10 ml-20 text-5xl text-white/50">
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
          <MenuButton text="SUGGESTIONS" onClick={undefined} />
          {
            user && user.role === "admin" &&
            <MenuButton text="DEVELOPER" onClick={() => navigate("/dev")} />
          }
          <MenuSpacer />

          <MenuButton text="SETTINGS" onClick={undefined} />
          <MenuSpacer />

          {
            !accessToken ?
              <MenuButton text="LOGIN" onClick={() => navigate("/login")} /> :
              <MenuButton text="LOGOUT" onClick={clearToken} />
          }
        </div>
      </div>

      {
        user &&
        <div className="fixed top-0 right-0 flex flex-col justify-end m-4 text-white">
          <span className="text-right">{user.username} ({user.role})</span>
        </div>
      }

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

      <Background />
    </main>
  );
}

export default LandingPage;