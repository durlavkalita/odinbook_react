import { useState, useEffect } from "react";
import axios from "axios";
import { PostType } from "../../types/postTypes";
import { useAuth } from "../../hooks/useAuth";
import { env_api_url } from "../../services/getEnvVar";
import PostDisplay from "./PostDisplay";

const PostList = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const { state, dispatch } = useAuth();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${env_api_url}/api/posts`, {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        });
        setPosts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="border rounded-lg p-4">
      <h2 className="text-lg font-medium mb-2">Posts</h2>
      {posts.map((post) => (
        <PostDisplay key={post._id} post={post}></PostDisplay>
      ))}
    </div>
  );
};

export default PostList;
