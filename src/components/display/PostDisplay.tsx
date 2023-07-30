import React, { useState } from "react";
import CommentDisplay from "./CommentDisplay";
import { PostType } from "../../types/postTypes";
import { CommentType } from "../../types/commentTypes";
import { useAuth } from "../../hooks/useAuth";
import axios from "axios";
import { env_api_url } from "../../services/getEnvVar";
import CommentForm from "../forms/CommentForm";
interface Props {
  post: PostType;
}

const PostDisplay = ({ post }: Props) => {
  const { state } = useAuth();
  const isLiked = post.liked_by.some((item) => item._id == state.user?.id);

  const [likedByUser, setLikedByUser] = useState(isLiked);
  const [showComments, setShowComments] = useState(false);

  const handleShowComments = () => {
    setShowComments(!showComments);
  };
  const handleLike = async () => {
    try {
      const response = await fetch(
        `${env_api_url}/api/posts/${post._id}/toggle_like`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );

      setLikedByUser(!likedByUser);
    } catch (error) {
      console.error(error);
    }
  };
  const handleComment = async (comment: string) => {
    try {
      const response = await axios.post(
        `${env_api_url}/api/posts/${post._id}/comments`,
        { content: comment },
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );
      // console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="border border-gray-300 rounded-md p-4 mb-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          {/* <div className="w-10 h-10 rounded-full mr-2 bg-gray-400"></div> */}
          <img
            className="h-8 w-8 rounded-full mr-2"
            src={post.author.profile_pic}
            alt={post.author.firstName}
          />
          <div>
            <div className="font-bold text-md">
              {post.author.firstName + " " + post.author.lastName}
            </div>
            <div className="text-gray-600 text-sm">
              {post.created_at.toString()}
            </div>
          </div>
        </div>
      </div>
      <div className="mb-4">{post.content}</div>
      <div className="grid grid-cols-3 bg-blue-50">
        <button
          onClick={handleLike}
          className={`flex items-center rounded-md justify-center border-2  hover:bg-blue-300 ${
            likedByUser ? "text-blue-800" : ""
          } `}
        >
          <span className="p-1">
            {post.liked_by ? post.liked_by.length : 0} Like
          </span>
        </button>

        <button
          onClick={handleShowComments}
          className="flex items-center justify-center border-2 hover:bg-blue-300"
        >
          <span className="text-gray-500">Comments</span>
        </button>

        <div className="flex items-center justify-center border-2 hover:bg-blue-300">
          <span className="text-gray-500">Share</span>
        </div>
      </div>
      <div className="py-4">
        <CommentForm onSubmit={handleComment}></CommentForm>

        {showComments ? (
          post.comments.length > 0 ? (
            post.comments.map((comment) => (
              <CommentDisplay key={comment._id} comment={comment} />
            ))
          ) : (
            <p className="my-2">No comments yet...</p>
          )
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default PostDisplay;
