import React from "react";
import { env_api_url } from "../../services/getEnvVar";
import { useAuth } from "../../hooks/useAuth";

type FriendRequest = {
  _id: string;
  recipient: {
    _id: string;
    firstName: string;
    lastName: string;
    profile_pic: string;
  };
  sender: {
    _id: string;
    firstName: string;
    lastName: string;
    profile_pic: string;
  };
  action: string;
};
function FriendRequestReceived(friendRequest: FriendRequest) {
  const { state } = useAuth();
  const handleFriendRequestResponse = async (friendRequestResponse: string) => {
    try {
      const response = await fetch(
        `${env_api_url}/api/friend-requests/${friendRequest._id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
          body: JSON.stringify({ action: friendRequestResponse }),
        }
      );
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="flex items-center space-x-4 p-4">
      <div className="flex-shrink-0">
        <img
          className="h-8 w-8 rounded-full"
          src={friendRequest.sender.firstName}
          alt={friendRequest.sender.firstName}
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">
          {friendRequest.sender.firstName} {friendRequest.sender.lastName}
        </p>
      </div>
      <div>
        <button
          onClick={() => {
            handleFriendRequestResponse("accepted");
          }}
          className="bg-blue-200 px-2"
        >
          +
        </button>
        <button
          onClick={() => {
            handleFriendRequestResponse("declined");
          }}
          className="bg-blue-200 px-2"
        >
          -
        </button>
      </div>
    </div>
  );
}

export default FriendRequestReceived;
