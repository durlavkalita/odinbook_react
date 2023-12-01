import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import { Post, PostWithComments } from "../types/postTypes";
import axios from "axios";
import PostForm from "../components/forms/PostForm";
import PostList from "../components/display/posts/PostList";
import LoadingSpinner from "../components/utility/LoadingSpinner";
import {
  FaAngleLeft,
  FaAngleDoubleLeft,
  FaAngleRight,
  FaAngleDoubleRight,
} from "react-icons/fa";

const env_api_url = import.meta.env.VITE_BACKEND_API_URL;

function Explore() {
  const [posts, setPosts] = useState<PostWithComments[]>([]);
  const { state, dispatch } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const perPage = 3;

  useEffect(() => {
    const controller = new AbortController();

    const fetchPosts = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${env_api_url}/api/posts?page=${currentPage}&perPage=${perPage}`,
          {
            headers: {
              Authorization: `Bearer ${state.token}`,
            },
            signal: controller.signal,
          }
        );
        setTotalPages(response.data.totalPages);
        setPosts(response.data.posts);
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
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages);
  };

  return (
    <div className="container mx-auto px-2 max-w-3xl mb-6">
      <div className="grid grid-cols-1 gap-4">
        <div className="mt-4">
          {isLoading && <LoadingSpinner size={32} color="red" />}
          {!isLoading && (
            <div>
              <PostList posts={posts}></PostList>
              <div className="flex justify-between px-4 py-2 items-center">
                <button
                  className="flex-grow flex justify-center"
                  onClick={handleFirstPage}
                >
                  <FaAngleDoubleLeft></FaAngleDoubleLeft>
                </button>
                <button
                  className="flex-grow flex justify-center"
                  onClick={handlePreviousPage}
                >
                  <FaAngleLeft></FaAngleLeft>
                </button>
                <span className="px-4">
                  {currentPage} / {totalPages}
                </span>
                <button
                  className="flex-grow flex justify-center"
                  onClick={handleNextPage}
                >
                  <FaAngleRight></FaAngleRight>
                </button>
                <button
                  className="flex-grow flex justify-center"
                  onClick={handleLastPage}
                >
                  <FaAngleDoubleRight></FaAngleDoubleRight>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Explore;
