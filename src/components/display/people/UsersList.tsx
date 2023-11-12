import React from "react";
import { User } from "../../../types/userTypes";
import { useAuth } from "../../../hooks/useAuth";
import UserModal from "./UserModal";
const env_api_url = import.meta.env.VITE_BACKEND_API_URL;

interface Props {
  users: User[];
}

function UsersList({ users }: Props) {
  const { state } = useAuth();

  const handleFriendRequest = async (user: User) => {
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
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ul className="divide-y divide-gray-300">
      {users.map((user) => (
        <UserModal
          key={user._id}
          profile_pic={user.profile_pic}
          firstName={user.firstName}
          lastName={user.lastName}
          email={user.email}
        >
          <button
            onClick={() => {
              handleFriendRequest(user);
            }}
            className="bg-blue-200 px-2"
          >
            Add
          </button>
        </UserModal>
      ))}
    </ul>
  );
}

export default UsersList;
