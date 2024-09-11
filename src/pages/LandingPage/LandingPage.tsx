import { useNavigate } from "react-router-dom";

import GoogleAd from "@/components/GoogleAd/GoogleAd";
import MenuButton from "../../components/MenuButton"
import MenuSpacer from "../../components/MenuSpacer"

import logoImg from '../../assets/placeholder-logo.png'
import backgroundImg from '../../assets/background.png'

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <main>
      <div className="flex flex-col items-start mt-20 ml-20 text-5xl text-white/50">
        <img src={logoImg} alt="logo" width={411} height={177} />

        <div className="flex flex-col items-start mt-20">
          <MenuButton text="SPIN WHEEL" onClick={() => { }} />
          <MenuSpacer />

          <MenuButton text="NEWS" onClick={() => { }} />
          <MenuButton text="COMPLETED" onClick={() => { }} />
          <MenuButton text="SUGGESTIONS" onClick={() => { }} />
          <MenuButton text="DEVELOPER" onClick={() => navigate("/dev")} />
          <MenuSpacer />

          <MenuButton text="SETTINGS" onClick={() => { }} />
          <MenuSpacer />

          <MenuButton text="LOGOUT" onClick={() => { }} />
        </div>
      </div>

      {/* <GoogleAd /> */}
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

export default LandingPage;