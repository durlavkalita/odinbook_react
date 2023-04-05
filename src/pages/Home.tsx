import PostDisplay from "../components/display/PostDisplay";
import PostForm from "../components/forms/PostForm";
import { useAuth } from "../hooks/useAuth";

function Home() {
  const auth = useAuth();

  const posts_list = [
    {
      id: 1,
      content: "post1",
      author: "author1",
      created_at: new Date(),
      likes: 10,
      comments: [
        {
          id: 1,
          author: "author1",
          content: "content1",
          created_at: new Date(),
        },
      ],
    },
    {
      id: 2,
      content: "post2",
      author: "author2",
      created_at: new Date(),
      likes: 20,
      comments: [
        {
          id: 2,
          author: "author2",
          content: "content2",
          created_at: new Date(),
        },
      ],
    },
  ];
  return (
    <div className="mt-4">
      <div>
        <p>Token: </p>
        <button onClick={() => {}}>Set Token</button>
      </div>
      <PostForm></PostForm>
      <div className="mt-4 max-w-xl m-auto">
        <ul>
          {posts_list.map((post) => (
            <PostDisplay key={post.id} post={post}></PostDisplay>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;
