import { useNavigate } from "react-router-dom";

import MenuButton from "../components/MenuButton"
import MenuSpacer from "../components/MenuSpacer"

import logoImg from '../assets/placeholder-logo.png'
import questService from "@/service/questService";
import { Quest } from "@/models/QuestModels/questResponse";
import { useEffect, useState } from "react";
import ViewQuest from "@/modals/ViewQuest";
import userService from "@/service/userService";
import { toast } from "@/components/Toaster";
import SuggestionsPanel from "@/components/SuggestionsPanel";
import { useAuth } from "@/context/useAuth";
import Modal from "@/components/Modal";
import News from "@/modals/News/News";

type ModalTypes = "quest" | "suggestions" | "news" | "settings" | null;

const LandingPage = () => {
  const { accessToken, clearToken, user } = useAuth();
  const navigate = useNavigate();

  const storedQuests = localStorage.getItem('currentQuest') ? JSON.parse(localStorage.getItem('currentQuest') as string) : null;
  const [currentQuest, setCurrentQuest] = useState<Quest | null>(storedQuests);
  const [currentOpenModal, setCurrentOpenModal] = useState<ModalTypes>(null);

  useEffect(() => {
    if (!currentQuest && currentOpenModal === "quest") {
      setCurrentOpenModal(null);
    };
  }, [currentQuest, currentOpenModal]);

  const handleOpenCurrentQuest = () => {
    if (!accessToken) return navigate("/login");

    setCurrentOpenModal("quest");
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
      setCurrentOpenModal("quest");
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

  const closeModal = () => {
    setCurrentOpenModal(null);
  }

  const getCurrentModal = () => {
    switch (currentOpenModal) {
      case "suggestions":
        return (
          <SuggestionsPanel onClose={closeModal} />
        );
      case "news":
        return (
          <Modal onClose={closeModal}>
            <News onClose={closeModal} />
          </Modal>
        )
      case "settings":
        return (
          <Modal onClose={closeModal}>
            <p>Settings</p>
          </Modal>
        )
      case "quest":
        if (!currentQuest) return null;
        return (
          <Modal onClose={closeModal}>
            <ViewQuest
              onClose={closeModal}
              onSkip={handleQuestSkip}
              onComplete={handleQuestComplete}
              imageUrl={currentQuest.image_url}
              title={currentQuest.title}
              category={currentQuest.category}
              description={currentQuest.description}
              objectives={currentQuest.objectives}
              infoUrl={currentQuest.info_url}
            />
          </Modal>
        );
      default:
        return null;
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

          <MenuButton text="NEWS" onClick={() => setCurrentOpenModal("news")} />
          <MenuButton text="completed quests" onClick={() => navigate("/completed-quests")} />
          <MenuButton text="SUGGESTIONS" onClick={() => setCurrentOpenModal("suggestions")} />
          <MenuSpacer />

          <MenuButton text="SETTINGS" onClick={() => setCurrentOpenModal("settings")} />
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
        getCurrentModal()
      }

    </main>
  );
}

export default LandingPage;