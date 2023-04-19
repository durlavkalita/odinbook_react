import React from "react";
import { UserType } from "../../types/userTypes";
import axios from "axios";
import { env_api_url } from "../../services/getEnvVar";
import { useAuth } from "../../hooks/useAuth";

type User = UserType & {
  _id: string;
  profile_pic: string;
};

function UserDisplay(user: User) {
  const { state } = useAuth();
  const handleFriendRequest = async () => {
    try {
      const response = await fetch(
        `${env_api_url}/api/users/${user._id}/friend-requests`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="flex items-center space-x-4 p-4">
      <div className="flex-shrink-0">
        <img
          className="h-8 w-8 rounded-full"
          src={user.profile_pic}
          alt={user.firstName}
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">
          {user.firstName + user.lastName}
        </p>
        <p className="text-sm text-gray-500 truncate">{user.email}</p>
      </div>
      <div>
        <button onClick={handleFriendRequest} className="bg-blue-200 px-2">
          +
        </button>
      </div>
    </div>
  );
}

export default UserDisplay;
