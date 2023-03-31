import React from "react";
import CommentDisplay from "./CommentDisplay";
import { Post, Comment } from "../../utils/types/types";
interface Props {
  post: Post;
}

const PostDisplay = ({ post }: Props) => {
  return (
    <div className="border border-gray-300 rounded-md p-4 mb-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full mr-2 bg-gray-400"></div>
          <div>
            <div className="font-bold text-md">{post.author}</div>
            <div className="text-gray-600 text-sm">
              {post.created_at.toString()}
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <div className="mr-2">{post.likes} likes</div>
        </div>
      </div>
      <div className="mb-4">{post.content}</div>
      {post.comments.map((comment) => (
        <CommentDisplay key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default PostDisplay;
