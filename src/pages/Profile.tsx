import { useState, useEffect } from "react";
import { UserType } from "../types/userTypes";
import axios from "axios";
import { env_api_url } from "../services/getEnvVar";
import { useAuth } from "../hooks/useAuth";
import { PostType } from "../types/postTypes";
import PostDisplay from "../components/display/PostDisplay";

type User = UserType & {
  friends: string[];
  profile_pic: string;
  postsWithComments: PostType[];
};

const Profile = () => {
  const [user, setUser] = useState<User>();
  const { state } = useAuth();
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
          <img
            className="w-32 h-32 rounded-full object-cover mr-8 mb-4 sm:mb-0 border-2 border"
            src={user?.profile_pic}
            alt="Profile"
          />
          <div className="flex flex-col">
            <h2 className="font-bold text-xl mb-1">
              {user?.firstName} {user?.lastName}
            </h2>
            <p className="text-gray-700">@johndoe</p>
          </div>
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
