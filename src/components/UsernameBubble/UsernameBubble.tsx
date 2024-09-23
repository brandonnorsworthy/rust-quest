import { UserToken } from '@/models/AuthModels/userToken';
import React from 'react';

type UsernameBubbleProps = {
  user: UserToken
}

const UsernameBubble: React.FC<UsernameBubbleProps> = ({ user }) => {
  return (
    <div className="fixed flex flex-col justify-end p-2 rounded top-4 md:top-8 right-4 md:right-8 text-black/50 bg-white/50">
      <p className="text-right">
        <span className="font-bold">Hello, {user.role === 'guest' ? "Anonymous" : user.username}</span>
        {
          (user.role === "admin" || user.role === "moderator") &&
          <span className={`font-bold ${user.role === "admin" ? "text-red-500" : user.role === "moderator" ? "text-blue-500"  : ""}`}> [{user.role}]</span>
        }
      </p>
    </div>
  )
};

export default UsernameBubble;