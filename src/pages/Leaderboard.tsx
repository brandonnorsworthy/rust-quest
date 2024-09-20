import { useNavigate } from "react-router-dom";

import { useCallback, useEffect, useState } from "react";
import { toast } from "@/components/Toaster";
import { useAuth } from "@/context/useAuth";
import Table from "@/components/Table";
import Button from "@/components/Button";
import Loader from "@/components/Loader";
import suggestionService from "@/service/suggestionService";
import { LeaderboardResponse } from "@/models/SuggestionModels/suggestionResponse";

interface LeaderboardPlacements extends LeaderboardResponse {
  place: number;
}

const LeaderboardPage = () => {
  const navigate = useNavigate();
  const { accessToken } = useAuth();

  const [users, setUsers] = useState<LeaderboardPlacements[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUsers: () => Promise<void> = useCallback(async () => {
    try {
      if (!accessToken) return;
      setIsLoading(true);

      const leaderboardResponse = await suggestionService.getLeaderboard(accessToken) as LeaderboardPlacements[];

      leaderboardResponse.forEach((user, index) => {
        user.place = index + 1;
      });

      setUsers(leaderboardResponse);
    } catch (error) {
      toast.error("Failed to get suggestions", error);
    } finally {
      setIsLoading(false);
    }
  }, [accessToken]);

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
      return;
    }
    fetchUsers();
  }, [accessToken, navigate, fetchUsers]);

  return (
    <main className="overflow-hidden h-dvh w-dvw">
      <div className="absolute h-dvh w-dvw overflow-hidden z-[-1] bg-secondary/50">
      </div>

      <div className="w-full h-full p-2 md:p-8">
        <div className="absolute top-4 left-4 md:top-8 md:left-8">
          <Button type="confirm" onClick={() => navigate("/")}>
            done
          </Button>
        </div>

        <div className="w-full h-full">
          <div className="flex items-end justify-center w-full h-1/6">
            <h1 className="text-4xl font-bold text-white">MOST APPROVED SUGGESTIONS</h1>
          </div>

          {
            isLoading ?
              <Loader /> :
              <div className="w-full h-5/6">
                <Table
                  data={users}
                  columns={[
                    { header: "", accessor: "place" },
                    { header: "Username", accessor: "username" },
                    { header: "# Approved", accessor: "suggestions" }
                  ]}
                />
              </div>
          }
        </div>
      </div>
    </main>
  );
}

export default LeaderboardPage;