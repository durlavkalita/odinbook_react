import { useState, useEffect } from "react";
import UsersList from "../components/display/people/UsersList";
import FriendRequestList from "../components/display/people/FriendRequestList";
import { User } from "../types/userTypes";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import UserModal from "../components/display/people/UserModal";
import { FriendRequest } from "../types/friendRequestTypes";
const env_api_url = import.meta.env.VITE_BACKEND_API_URL;

function People() {
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
    <div className="mx-auto px-2 max-w-3xl flex flex-col justify-center items-center">
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
      <div className={`${currentListOption == "find_people" ? "" : "hidden"}`}>
        <p className="font-bold text-xl my-4">Find People</p>
        <UsersList users={users} />
      </div>
      {/* friend request received list */}
      <div
        className={`${currentListOption == "request_received" ? "" : "hidden"}`}
      >
        <p className="font-bold text-xl my-4">Friend Request Received</p>
        <FriendRequestList friendRequests={friendRequestReceived} />
      </div>
      {/* friend request sent list */}
      <div className={`${currentListOption == "request_sent" ? "" : "hidden"}`}>
        <p className="font-bold text-xl my-4">Friend Request Sent</p>
        <ul className="divide-y divide-gray-300">
          {friendRequestSent.map((friendRequest) => (
            <UserModal
              key={friendRequest._id}
              id={friendRequest.recipient.id}
              firstName={friendRequest.recipient.firstName}
              lastName={friendRequest.recipient.lastName}
              profile_pic={friendRequest.recipient.profile_pic}
              email={friendRequest.recipient.email}
            >
              ...
            </UserModal>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default People;
