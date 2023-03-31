import React from "react";
import { Comment } from "../../utils/types/types";

interface Props {
  comment: Comment;
}

const CommentDisplay = ({ comment }: Props) => {
  return (
    <div className="bg-gray-100 p-2">
      <div key={comment.id} className="mb-2">
        <span className="font-bold mr-2">{comment.author}</span>
        <span className="text-gray-500 text-sm">
          {comment.created_at.toString()}
        </span>
        <p className="mt-1">{comment.content}</p>
      </div>
    </div>
  );
};

export default CommentDisplay;
