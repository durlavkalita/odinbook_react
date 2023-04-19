import React from "react";

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
        <li key={friendRequest._id}>
          {friendRequest.sender.firstName} {friendRequest.sender.lastName}
        </li>
      ))}
    </ul>
  );
}

export default FriendRequestList;
