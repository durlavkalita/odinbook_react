import { useState, useEffect } from "react";
import UsersList from "../components/display/UsersList";
import FriendRequestList from "../components/display/FriendRequestList";
import { UserType } from "../types/userTypes";
import axios from "axios";
import { env_api_url } from "../services/getEnvVar";
import { useAuth } from "../hooks/useAuth";

type User = UserType & {
  _id: string;
  profile_pic: string;
};
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

function Friends() {
  const [users, setUsers] = useState<User[]>([]);
  const [friendRequestReceived, setFriendRequestReceived] = useState<
    FriendRequest[]
  >([]);
  const [friendRequestSent, setFriendRequestSent] = useState<FriendRequest[]>(
    []
  );
  const { state } = useAuth();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${env_api_url}/api/users`, {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        });
        setUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchFriendRequestReceived = async () => {
      try {
        const response = await axios.get(`${env_api_url}/api/friend-requests`, {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        });
        setFriendRequestReceived(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchFriendRequestSent = async () => {
      try {
        const response = await axios.get(
          `${env_api_url}/api/friend-requests-sent`,
          {
            headers: {
              Authorization: `Bearer ${state.token}`,
            },
          }
        );

        setFriendRequestSent(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    console.log(friendRequestReceived);
    console.log(friendRequestSent);

    fetchUsers();
    fetchFriendRequestReceived();
    fetchFriendRequestSent();
  }, []);
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="p-4">
        <p className="font-bold text-xl my-4">All Users</p>
        <UsersList users={users} />
      </div>
      <div className="p-4">
        <p className="font-bold text-xl my-4">Friend Request Received</p>
        <FriendRequestList friendRequests={friendRequestReceived} />
      </div>
      <div className="p-4">
        <p className="font-bold text-xl my-4">Friend Request Sent</p>
        <ul>
          {friendRequestSent.map((friendRequest) => (
            <li key={friendRequest._id}>
              {friendRequest.recipient.firstName}{" "}
              {friendRequest.recipient.lastName}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Friends;
