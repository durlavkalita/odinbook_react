import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../hooks/useAuth";
import PostModal from "../components/display/posts/PostModal";
import Button from "../components/utility/Button";
import UserModal from "../components/display/people/UserModal";
import { UserWithFriends } from "../types/userTypes";

const env_api_url = import.meta.env.VITE_BACKEND_API_URL;

const Profile = () => {
  const [showUpdateDPForm, setShowUpdateDPForm] = useState(false);
  const [newDP, setNewDP] = useState("");
  const [user, setUser] = useState<UserWithFriends>();
  const { state } = useAuth();
  const [showFriends, setShowFriends] = useState(false);

  const handleUpdateDP = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const data = { profile_pic: newDP };
    try {
      const response = await fetch(
        `${env_api_url}/api/users/${state.user?.id}/update`,
        {
          method: "PATCH",
          body: JSON.stringify(data),
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${state.token}`,
          },
        }
      );
      // console.log(response.json());
    } catch (error) {
      console.error(error);
    }

    setNewDP("");
    setShowUpdateDPForm(false);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `${env_api_url}/api/users/${state.user?.id}`,
          {
            headers: {
              Authorization: `Bearer ${state.token}`,
            },
          }
        );
        setUser(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="container mx-auto px-2 max-w-3xl">
      <div className="bg-white rounded-lg shadow-md mb-8 p-8">
        <div className="flex flex-col sm:flex-row items-center my-4">
          {user?.profile_pic ? (
            <img
              className="w-32 h-32 rounded-full object-cover mr-8 mb-4 sm:mb-0 border-2 border"
              src={user?.profile_pic}
              alt="Profile"
            />
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="0"
              className="w-8 h-8 text-gray-600"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 21v-1a4 4 0 0 1 4-4h2a4 4 0 0 1 4 4v1"
              />
              <circle cx="12" cy="7" r="4" />
            </svg>
          )}

          <div className="flex flex-col">
            <h2 className="font-bold text-xl mb-1">
              {user?.firstName} {user?.lastName}
            </h2>
            <p className="text-gray-700">{user?.email}</p>
          </div>
        </div>
        <div className="flex items-center justify-center">
          {showUpdateDPForm ? (
            <div>
              <form onSubmit={handleUpdateDP} className="flex">
                <input
                  className="border mx-2 px-2"
                  type="text"
                  placeholder="Add picture url"
                  value={newDP}
                  onChange={(e) => setNewDP(e.target.value)}
                />
                <Button>Submit</Button>
              </form>
              <Button
                className="mx-2 my-2 w-full bg-red-400 hover:bg-red-700"
                onClick={() => setShowUpdateDPForm(!showUpdateDPForm)}
              >
                Cancel
              </Button>
            </div>
          ) : (
            <Button
              onClick={() => {
                setShowUpdateDPForm(!showUpdateDPForm);
              }}
            >
              Update Profile Photo
            </Button>
          )}
        </div>
      </div>
      <div className="border rounded-lg p-1">
        <div className="flex justify-around items-center">
          <div
            className={`text-lg font-medium mb-2 flex-grow text-center cursor-pointer py-2 ${
              showFriends ? "" : "bg-blue-100"
            }`}
            onClick={() => setShowFriends(false)}
          >
            Posts
          </div>
          <div
            className={`text-lg font-medium mb-2 flex-grow text-center cursor-pointer py-2 ${
              showFriends ? "bg-blue-100" : ""
            }`}
            onClick={() => setShowFriends(true)}
          >
            Friends
          </div>
        </div>
        <div className={`flex flex-col ${showFriends ? "items-center" : ""}`}>
          {showFriends
            ? user?.friends.map((friend) => (
                <UserModal
                  key={friend._id}
                  id={friend._id}
                  profile_pic={friend.profile_pic}
                  firstName={friend.firstName}
                  lastName={friend.lastName}
                  email={friend.email}
                >
                  {""}
                </UserModal>
              ))
            : user?.postsWithComments.map((post) => (
                <PostModal key={post._id} post={post}></PostModal>
              ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;
