import PostForm from "../components/forms/PostForm";
import PostList from "../components/display/PostList";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const token = localStorage.getItem("odinbook_token");
  const expiryTime = localStorage.getItem("odinbook_expiryTime");
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuthTimeout = () => {
      const remainingTime = expiryTime
        ? new Date(parseInt(expiryTime)).getTime() - new Date().getTime()
        : 0;

      setTimeout(() => {
        localStorage.removeItem("odinbook_user");
        localStorage.removeItem("odinbook_token");
        localStorage.removeItem("odinbook_expiryTime");
      }, remainingTime);
    };
    const autoLogout = () => {
      localStorage.removeItem("odinbook_user");
      localStorage.removeItem("odinbook_token");
      localStorage.removeItem("odinbook_expiryTime");
      navigate("/login");
    };

    if (token && expiryTime && new Date().getTime() > parseInt(expiryTime)) {
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
