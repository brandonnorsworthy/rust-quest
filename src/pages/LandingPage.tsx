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
import News from "@/modals/News";
import Settings from "@/modals/Settings";
import RegisterAccount from "@/modals/RegisterAccount";
import { ModalTypes } from "@/models/modals";


const LandingPage = () => {
  const { accessToken, clearToken, user } = useAuth();
  const navigate = useNavigate();

  const storedQuests = localStorage.getItem('currentQuest') ? JSON.parse(localStorage.getItem('currentQuest') as string) : null;
  const [currentQuest, setCurrentQuest] = useState<Quest | null>(storedQuests);
  const [currentOpenModal, setCurrentOpenModal] = useState<ModalTypes>(null);

  const disableButtons = currentOpenModal ? true : false;

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
            <Settings onClose={closeModal} />
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
              quest={currentQuest}
            />
          </Modal>
        );
      case "register":
        return (
          <Modal onClose={closeModal}>
            <RegisterAccount
              onClose={closeModal}
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
              <MenuButton
                text="current quest"
                disabled={disableButtons}
                onClick={handleOpenCurrentQuest}
              /> :
              <MenuButton
                text="SPIN WHEEL"
                disabled={disableButtons}
                onClick={handleSpinWheel}
              />
          }
          <MenuSpacer />

          <MenuButton
            text="NEWS"
            disabled={disableButtons}
            onClick={() => setCurrentOpenModal("news")}
          />
          <MenuButton
            text="all quests"
            disabled={disableButtons}
            onClick={() => {
              if (!accessToken) return navigate("/login");
              navigate("/all-quests")
            }}
          />
          <MenuButton
            text="SUGGESTIONS"
            disabled={disableButtons}
            onClick={() => {
              if (!accessToken) return navigate("/login");
              setCurrentOpenModal("suggestions")
            }}
          />
          <MenuSpacer />

          <MenuButton
            text="SETTINGS"
            disabled={disableButtons}
            onClick={() => setCurrentOpenModal("settings")}
          />
          {
            user && user.role === "admin" &&
            <MenuButton
              text="ADMIN"
              disabled={disableButtons}
              onClick={() => navigate("/admin")}
            />
          }
          <MenuSpacer />

          {
            !accessToken ?
              <MenuButton
                text="LOGIN"
                disabled={disableButtons}
                onClick={() => navigate("/login")}
              /> :
              <MenuButton
                text="LOGOUT"
                disabled={disableButtons}
                onClick={clearToken}
              />
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