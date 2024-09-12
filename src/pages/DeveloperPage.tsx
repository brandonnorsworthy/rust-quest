import { useState } from "react";
import { useNavigate } from "react-router-dom";

import questService from "@/service/questService";
import { Quest } from "@/models/QuestModels/questResponse";
import useAuth from "@/hooks/useAuth";
import MenuButton from "@/components/MenuButton"
import MenuSpacer from "@/components/MenuSpacer"
import QuestModal from "@/components/QuestModal";
import logoImg from '@/assets/placeholder-logo.png'
import backgroundImg from '@/assets/background.png'

const DeveloperPage = () => {
  const navigate = useNavigate();
  const { accessToken } = useAuth();
  const [currentQuest, setCurrentQuest] = useState<Quest | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleGetRandomQuest = async () => {
    if (!accessToken) return;
    const randomQuestResponse = await questService.getRandomQuest(accessToken);

    setCurrentQuest(randomQuestResponse);
  }

  return (
    <main className="h-screen overflow-hidden">
      <div className="flex flex-col items-start mt-10 ml-20 text-5xl text-white/50">
        <img src={logoImg} alt="logo" className="h-36 md:h-32" />

        <div className="flex flex-col items-start mt-20">
          <MenuButton text="RANDOM QUEST" onClick={handleGetRandomQuest} />
          <MenuSpacer />

          <MenuButton text="TEST MODAL" onClick={() => setIsModalOpen(true)} />
          <MenuSpacer />

          <MenuButton text="GO HOME" onClick={() => navigate("/")} />
        </div>
      </div>

      {
        currentQuest &&
        <div className="flex flex-col bg-white">
          <span className="text-xlg">{currentQuest.title}</span>
          <span className="text-lg">{currentQuest.description}</span>
          {
            currentQuest.objectives?.map((objective, index) =>
              <span key={objective + index}>{objective}</span>
            )}
        </div>
      }

      <QuestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        imageUrl="https://via.placeholder.com/870x350"
        title="Modal Title"
        category="PVE"
        description="Once a cargo ship spawns on the map you must immediately go to take over the ship and kill any people who may come to counter your efforts"
        objectives={[
          "Hack all 3 crates",
          "Kill all scientists",
          "Escape with the loot"
        ]}
      />

      <div className="absolute top-0 left-0 w-full h-full z-[-1]">
        {/* Image Background */}
        <img src={backgroundImg} alt="background" className="absolute top-0 left-0 object-cover w-full h-full" />

        {/* Gradient Overlay */}
        <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: "radial-gradient(circle, rgba(36, 34, 28, 0), rgba(36, 34, 28, 0.5))" }}>
        </div>
      </div>
    </main>
  );
}

export default DeveloperPage;