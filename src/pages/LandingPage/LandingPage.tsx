//import { useState } from "react";

import LoginPanel from "@/components/LoginPanel";


const LandingPage = () => {

  return (
    <div className="h-screen text-white bg-idk">
      <header className='flex justify-between p-4 text-3xl '>
        <h1 className=''>
          Welcome to the resurected rust app
        </h1>
        <LoginPanel />
      </header>
      <main className="px-12 py-2">
        hehe
      </main>
    </div>
  );
}

export default LandingPage;