import { useState } from "react";
import { useNavigate } from "react-router-dom";

import questService from "@/service/questService";
import { Quest } from "@/models/QuestModels/questResponse";
import useAuth from "@/hooks/useAuth";
import MenuButton from "@/components/MenuButton"
import MenuSpacer from "@/components/MenuSpacer"
import QuestModal from "@/components/QuestModal";
import withAuth from "@/hocs/WithAuth";

import logoImg from '@/assets/placeholder-logo.png'
import Background from "@/components/Background";
import { Dialog, DialogContent } from "@radix-ui/react-dialog";
import Button from "@/components/Button";

const DeveloperPage = () => {
  const navigate = useNavigate();
  const { accessToken } = useAuth();
  const [currentQuest, setCurrentQuest] = useState<Quest | null>(null);
  const [isQuestModalOpen, setIsQuestModalOpen] = useState(false);

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

          <MenuButton text="TEST MODAL" onClick={() => setIsQuestModalOpen(true)} />
          <MenuSpacer />

          <MenuButton text="back" onClick={() => navigate("/")} />
        </div>
      </div>

      {
        currentQuest &&
        <Dialog open={true} modal>
          <DialogContent
            className="bg-slate-100"
          >
            <p>
            {JSON.stringify(currentQuest)}
            </p>
            <Button type="confirm" text="close" onClick={() => setCurrentQuest(null)} />
          </DialogContent>
        </Dialog>
      }

      <QuestModal
        onClose={() => setIsQuestModalOpen(false)}
        onComplete={() => setIsQuestModalOpen(false)}
        onSkip={() => setIsQuestModalOpen(false)}
        infoUrl="https://google.com"
        isOpen={isQuestModalOpen}
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

      <Background />
    </main>
  );
}

const AuthenticatedDeveloperPage = withAuth(DeveloperPage);

export default AuthenticatedDeveloperPage;