import React from "react";

type Sender = {
  _id: string;
  firstName: string;
  lastName: string;
};

function FriendRequestReceived(sender: Sender) {
  const handleFriendRequestResponse = (response: string) => {
    console.log(response);
  };
  return (
    <div className="flex items-center space-x-4 p-4">
      <div className="flex-shrink-0">
        <img
          className="h-8 w-8 rounded-full"
          src={sender.firstName}
          alt={sender.firstName}
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">
          {sender.firstName} {sender.lastName}
        </p>
      </div>
      <div>
        <button
          onClick={() => {
            handleFriendRequestResponse("accept");
          }}
          className="bg-blue-200 px-2"
        >
          +
        </button>
        <button
          onClick={() => {
            handleFriendRequestResponse("delete");
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
