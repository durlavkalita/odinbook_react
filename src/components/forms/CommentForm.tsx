import { useState } from "react";

type CommentFormProps = {
  onSubmit: (comment: string) => void;
};

const CommentForm = ({ onSubmit }: CommentFormProps) => {
  const [comment, setComment] = useState("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(comment);
    setComment("");
  };

  const handleCommentChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setComment(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex flex-col mb-4">
        <label
          htmlFor="comment"
          className="mb-2 font-bold text-lg text-gray-900"
        >
          Comment
        </label>
        <textarea
          id="comment"
          name="comment"
          className="border border-gray-500 py-2 px-3 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-600"
          rows={5}
          value={comment}
          onChange={handleCommentChange}
        ></textarea>
      </div>

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Submit
      </button>
    </form>
  );
};

export default CommentForm;
