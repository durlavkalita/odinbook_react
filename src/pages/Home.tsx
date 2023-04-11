import PostForm from "../components/forms/PostForm";
import PostList from "../components/display/PostList";
import { useEffect } from "react";

function Home() {
  const token = localStorage.getItem("token");
  const expiryTime = localStorage.getItem("expiryTime");

  useEffect(() => {
    const checkAuthTimeout = () => {
      const expiryTime = localStorage.getItem("expiryTime");
      const remainingTime = expiryTime
        ? new Date(parseInt(expiryTime)).getTime() - new Date().getTime()
        : 0;

      setTimeout(() => {
        localStorage.removeItem("odinbook_user");
        localStorage.removeItem("odinbook_token");
        localStorage.removeItem("odinbook_expiryTime");
      }, remainingTime);
    };

    if (token && expiryTime && new Date().getTime() < parseInt(expiryTime)) {
      checkAuthTimeout();
    }
  }, []);

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 gap-4">
        <PostForm></PostForm>
        <PostList></PostList>
      </div>
    </div>
  );
}

export default Home;
