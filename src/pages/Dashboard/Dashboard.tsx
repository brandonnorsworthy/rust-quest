import { useNavigate } from "react-router-dom";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div>
      <h1>Dashboard</h1>
      <button
        className="p-2 mt-2 text-white transition-colors rounded-md bg-slate-500 hover:bg-slate-400"
        onClick={() => navigate('/')}
      >
        back to /
      </button>
    </div>
  )
};

export default Dashboard;