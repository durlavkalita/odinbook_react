import React from "react";
import { useAuth } from "../../../hooks/useAuth";
import axios from "axios";
import { env_api_url } from "../../../services/getEnvVar";
import UserModal from "./UserModal";

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

interface Props {
  friendRequests: FriendRequest[];
}

function FriendRequestList({ friendRequests }: Props) {
  const { state } = useAuth();
  const handleFriendRequestResponse = async (id: string, response: string) => {
    const payload = {
      action: response,
    };
    try {
      const response = axios.patch(
        `${env_api_url}/api/friend-requests/${id}`,
        payload,
        { headers: { Authorization: `Bearer ${state.token}` } }
      );
      // console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <ul>
      {friendRequests.map((friendRequest) => (
        <UserModal
          key={friendRequest._id}
          profile_pic={friendRequest.sender.profile_pic}
          firstName={friendRequest.sender.firstName}
          lastName={friendRequest.sender.lastName}
          email="dummy"
        >
          <button
            onClick={() => {
              handleFriendRequestResponse(friendRequest._id, "accepted");
            }}
            className="bg-blue-200 px-2"
          >
            +
          </button>
          <button
            onClick={() => {
              handleFriendRequestResponse(friendRequest._id, "declined");
            }}
            className="bg-blue-200 px-2"
          >
            -
          </button>
        </UserModal>
      ))}
    </ul>
  );
}

export default FriendRequestList;
