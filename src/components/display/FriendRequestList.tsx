import React from "react";
import FriendRequestReceived from "./FriendRequestReceived";

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

interface FriendRequestListProps {
  friendRequests: FriendRequest[];
}

function FriendRequestList(props: FriendRequestListProps) {
  const { friendRequests } = props;

  return (
    <ul>
      {friendRequests.map((friendRequest) => (
        <FriendRequestReceived
          key={friendRequest._id}
          {...friendRequest}
        ></FriendRequestReceived>
      ))}
    </ul>
  );
}

export default FriendRequestList;
