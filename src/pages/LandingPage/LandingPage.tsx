import { useNavigate } from "react-router-dom";
import LoginPanel from "@/components/LoginPanel";


const LandingPage = () => {
  const nav = useNavigate();

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
        <button
          className="p-2 mt-2 text-white transition-colors rounded-md bg-slate-500 hover:bg-slate-400"
          onClick={() => nav('/dashboard')}
        >
          test auth
        </button>
        <button
          className="p-2 mt-2 text-white transition-colors rounded-md bg-slate-500 hover:bg-slate-400"
          onClick={() => { localStorage.removeItem('token'); }}
        >
          reset token
        </button>
      </main>
    </div>
  );
}

export default LandingPage;