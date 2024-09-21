import { useNavigate } from "react-router-dom";

import MenuButton from "@/components/MenuButton"
import MenuSpacer from "@/components/MenuSpacer"

import logoImg from '@/assets/placeholder-logo.png'
import withAuth from "@/hocs/withAuth";

const ModeratorPage = () => {
  const navigate = useNavigate();
  return (
    <main className="flex justify-center overflow-hidden h-dvh w-dvw">
      <div className="flex flex-col xl:max-w-[86rem] items-start mt-1 w-full ml-2 text-5xl sm:mt-10 sm:ml-10 text-white/50">
        <img src={logoImg} alt="logo" className="h-36 md:h-32" />

        <div className="flex flex-col items-start mt-20">
          <MenuButton text="suggestions" onClick={() => navigate("/moderator/suggestions")} />
          <MenuButton text="quests" onClick={() => navigate("/moderator/quests")} />
          <MenuSpacer />

          <MenuButton text="back" onClick={() => navigate("/")} />
        </div>
      </div>
    </main>
  );
}

const AuthenticatedModeratorPage = withAuth(ModeratorPage, "moderator");

export default AuthenticatedModeratorPage;