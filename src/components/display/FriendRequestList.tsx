import React from "react";

type FriendRequest = {
  id: string;
  receiver: string;
  sender: string;
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
        <li key={friendRequest.id}>
          {friendRequest.receiver} - {friendRequest.sender}
        </li>
      ))}
    </ul>
  );
}

export default FriendRequestList;
