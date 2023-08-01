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
  const [currentListOption, setCurrentListOption] = useState("find_people");
  const { state } = useAuth();

  useEffect(() => {
    const fetchFindPeople = async () => {
      try {
        const response = await axios.get(
          `${env_api_url}/api/users/find-people`,
          {
            headers: {
              Authorization: `Bearer ${state.token}`,
            },
          }
        );
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

    fetchFindPeople();
    fetchFriendRequestReceived();
    fetchFriendRequestSent();
  }, []);

  const handleOptionChange = (event: { target: { value: any } }) => {
    setCurrentListOption(event.target.value);
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-full mx-auto p-4">
        <select
          name="listOptions"
          id="listOptions"
          onChange={handleOptionChange}
          className="border w-full py-1 px-2 bg-white"
        >
          <option value="find_people">Find People</option>
          <option value="request_received">Friend Request Received</option>
          <option value="request_sent">Friend Request Sent</option>
        </select>
      </div>
      {/* Find new people */}
      <div
        className={`p-4 ${currentListOption == "find_people" ? "" : "hidden"}`}
      >
        <p className="font-bold text-xl my-4">Find People</p>
        <UsersList users={users} />
      </div>
      {/* friend request received list */}
      <div
        className={`p-4 ${
          currentListOption == "request_received" ? "" : "hidden"
        }`}
      >
        <p className="font-bold text-xl my-4">Friend Request Received</p>
        <FriendRequestList friendRequests={friendRequestReceived} />
      </div>
      {/* friend request sent list */}
      <div
        className={`p-4 ${currentListOption == "request_sent" ? "" : "hidden"}`}
      >
        <p className="font-bold text-xl my-4">Friend Request Sent</p>
        <ul>
          {friendRequestSent.map((friendRequest) => (
            <li key={friendRequest._id}>
              <div className="flex items-center space-x-4 p-4 bg-blue-50">
                <div className="flex-shrink-0">
                  <img
                    className="h-8 w-8 rounded-full"
                    src={friendRequest.recipient.profile_pic}
                    alt={friendRequest.recipient.firstName}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {friendRequest.recipient.firstName}{" "}
                    {friendRequest.recipient.lastName}
                  </p>
                </div>
                <div></div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Friends;
