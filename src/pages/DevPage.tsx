import useAuth from "@/hooks/useAuth"
import questService from "@/service/questService";
import { useState } from "react";

import { Quest } from "../models/QuestModels/questResponse"

const DevPage: React.FC = () => {
  const { accessToken } = useAuth();
  const [currentQuest, setCurrentQuest] = useState<Quest | null>(null);

  const handleGetRandomQuest = async () => {
    if (!accessToken) return;
    const randomQuestResponse = await questService.getRandomQuest(accessToken);

    setCurrentQuest(randomQuestResponse);
  }

  console.log(currentQuest)

  return (
    <div>
      {
        <button
          onClick={handleGetRandomQuest}>
          Get Random Test
        </button>
      }
      {
        currentQuest &&
        <div className="flex flex-col">
          <span className="text-xlg">{currentQuest.title}</span>
          <span className="text-lg">{currentQuest.description}</span>
          {
            currentQuest.objectives?.map((objective, index) =>
              <span key={objective + index}>{objective}</span>
            )}
        </div>
      }
    </div>
  )
}

export default DevPage