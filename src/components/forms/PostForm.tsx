import React, { useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import axios from "axios";
import { env_api_url } from "../../services/getEnvVar";
import { useNavigate } from "react-router-dom";
function PostForm() {
  const [content, setContent] = useState("");
  const { state } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${env_api_url}/api/posts`,
        { content },
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );
      // console.log(response);
      setContent("");
    } catch (error) {
      console.error(error);
    }
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded-lg mb-4">
      <h2 className="text-lg font-medium mb-2">Create Post</h2>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
        className="border rounded-lg p-2 w-full mb-2"
        required
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Submit
      </button>
    </form>
  );
}

export default PostForm;