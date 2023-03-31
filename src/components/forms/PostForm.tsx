import React, { useState } from "react";

function PostForm() {
  const [content, setContent] = useState("");

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Submit the form data to the server...
    const post = { content };
    console.log(post);
    // Clear the form fields after submission
    setContent("");
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto">
      <div className="mb-4">
        <textarea
          id="content"
          value={content}
          onChange={(event) => setContent(event.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="What's on your mind?"
        />
      </div>
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Create Post
      </button>
    </form>
  );
}

export default PostForm;
