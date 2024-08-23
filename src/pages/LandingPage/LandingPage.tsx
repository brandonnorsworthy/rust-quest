import LoginPanel from "@/components/LoginPanel";
import SuggestionsPanel from "@/components/SuggestionsPanel/SuggestionsPanel";


const LandingPage = () => {

  return (
    <div className="h-screen font-bold text-white bg-idk font-rust-like">
      <header className='flex justify-between p-4 text-3xl '>
        {/* logo? */}
        <h1 className='text-5xl'>
          Welcome to the resurected rust app
        </h1>

      </header>
      <main className="px-12 py-2">
        <div className="flex flex-col items-start gap-4 pl-32 text-4xl mt-60">
          {/* todo: finalize flow, which menu options should be visible before login etc*/}
          <LoginPanel />
          <button className="mt-12">
            SPIN WHEEL
          </button>
          <button>
            COMPLETED QUESTS
          </button>
          <SuggestionsPanel />
          <button className="mt-12">
            SETTINGS
          </button>
        </div>
      </main>
    </div>
  );
}

export default LandingPage;