import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { PostType } from "../types/postTypes";
import axios from "axios";
import PostForm from "../components/forms/PostForm";
import PostList from "../components/display/posts/PostList";
import LoadingSpinner from "../components/utility/LoadingSpinner";
import { UserType } from "../types/userTypes";
const env_api_url = import.meta.env.VITE_BACKEND_API_URL;

interface Post {
  _id: number;
  author: UserType;
  content: string;
  created_at: Date;
  liked_by: { _id: string }[];
}

function Home() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const { state, dispatch } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${env_api_url}/api/posts`, {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
          signal: controller.signal,
        });
        setPosts(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();

    return function () {
      controller.abort();
    };
  }, []);

  const handlePostSubmit = (newPost: Post) => {
    console.log(newPost);
    const convertedPost: PostType = {
      ...newPost, // Copy the properties from Post
      comments: [], // Set comments to an empty array in PostType
    };
    setPosts([convertedPost, ...posts]);
  };

  return (
    <div className="container mx-auto px-4 md:px-32 lg:px-48">
      <div className="grid grid-cols-1 gap-4">
        <PostForm onPostSubmit={handlePostSubmit}></PostForm>
        <div className="border">
          {isLoading && <LoadingSpinner size={32} color="red" />}
          {!isLoading && <PostList posts={posts}></PostList>}
        </div>
      </div>
    </div>
  );
}

export default Home;
