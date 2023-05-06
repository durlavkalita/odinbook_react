import PostForm from "../components/forms/PostForm";
import PostList from "../components/display/PostList";

function Home() {
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
