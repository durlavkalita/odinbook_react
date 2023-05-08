import React from "react";
import { CommentType } from "../../types/commentTypes";

interface Props {
  comment: CommentType;
}

const CommentDisplay = ({ comment }: Props) => {
  return (
    <div className="bg-gray-100 p-2 my-2">
      <div key={comment._id} className="mb-2">
        <span className="font-bold mr-2">
          {comment.author.firstName + " " + comment.author.lastName}
        </span>
        <span className="text-gray-500 text-sm">
          {comment.created_at.toString()}
        </span>
        <p className="mt-1">{comment.content}</p>
      </div>
    </div>
  );
};

export default CommentDisplay;
