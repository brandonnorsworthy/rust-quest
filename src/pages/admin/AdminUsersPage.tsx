import { useNavigate } from "react-router-dom";

import { useCallback, useEffect, useState } from "react";
import { toast } from "@/components/Toaster";
import { useAuth } from "@/context/useAuth";
import withAuth from "@/hocs/withAuth";
import Table from "@/components/Table";
import Button from "@/components/Button";
import { User } from "@/models/UserModels/userResponse";
import userService from "@/service/userService";
import Loader from "@/components/Loader";

const AdminUsersPage = () => {
  const navigate = useNavigate();
  const { accessToken } = useAuth();

  const [users, setUsers] = useState<User[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  const maxLength = 20;

  const fetchUsers: () => Promise<void> = useCallback(async () => {
    try {
      if (!accessToken) return;
      setIsLoading(true);

      const usersResponse = await userService.getUsers(accessToken, page);

      setUsers(usersResponse);
    } catch (error) {
      toast.error("Failed to get suggestions", error);
    } finally {
      setIsLoading(false);
    }
  }, [accessToken, page]);

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
      return;
    }
    fetchUsers();
  }, [accessToken, navigate, fetchUsers]);

  useEffect(() => {
    fetchUsers();
  }, [page, fetchUsers]);

  return (
    <main className="overflow-hidden h-dvh w-dvw">
      <div className="absolute h-dvh w-dvw overflow-hidden z-[-1] bg-secondary/50">
      </div>

      <div className="w-full h-full p-8">
        <div className="absolute top-8 left-8">
          <Button type="confirm" onClick={() => navigate("/admin")}>
            done
          </Button>
        </div>

        <div className="w-full h-full">
          <div className="flex items-center justify-center w-full h-1/6">
            <h1 className="text-4xl font-bold text-white">Admin All User</h1>
          </div>

          {
            isLoading ?
              <Loader /> :
              <div className="w-full h-5/6">
                <Table
                  data={users}
                  columns={[
                    { header: "ID", accessor: "id" },
                    { header: "Username", accessor: "username" },
                    { header: "role", accessor: "role" },
                    { header: "last login", accessor: "last_login" },
                    { header: "logins", accessor: "login_count" },
                  ]}
                  page={page}
                  maxLength={maxLength}
                  setPage={setPage}
                />
              </div>
          }
        </div>
      </div>
    </main>
  );
}

const AuthenticatedAdminUsersPage = withAuth(AdminUsersPage, "admin");

export default AuthenticatedAdminUsersPage;