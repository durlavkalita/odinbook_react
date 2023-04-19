import { useState, useEffect } from "react";
import { UserType } from "../types/userTypes";
import axios from "axios";
import { env_api_url } from "../services/getEnvVar";
import { useAuth } from "../hooks/useAuth";
import { PostType } from "../types/postTypes";
import PostDisplay from "../components/display/PostDisplay";
import Button from "../components/utility/Button";

type User = UserType & {
  friends: string[];
  profile_pic: string;
  postsWithComments: PostType[];
};

const Profile = () => {
  const [showUpdateDPForm, setShowUpdateDPForm] = useState(false);
  const [newDP, setNewDP] = useState("");
  const [user, setUser] = useState<User>();
  const { state } = useAuth();

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
    <div className="max-w-5xl mx-auto px-4">
      <div className="bg-white rounded-lg shadow-md mb-8 p-8">
        <div className="flex flex-col sm:flex-row items-center">
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
            <p className="text-gray-700">@johndoe</p>
          </div>
        </div>
        <div>
          {showUpdateDPForm ? (
            <div className="flex">
              <form onSubmit={handleUpdateDP}>
                <input
                  type="text"
                  placeholder="add picture url"
                  value={newDP}
                  onChange={(e) => setNewDP(e.target.value)}
                />
                <Button>Submit</Button>
              </form>
              <Button
                className="mx-2"
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
      <div className="border rounded-lg p-4">
        <h2 className="text-lg font-medium mb-2">Posts</h2>
        {user?.postsWithComments.map((post) => (
          <PostDisplay key={post._id} post={post}></PostDisplay>
        ))}
      </div>
    </div>
  );
};

export default Profile;
