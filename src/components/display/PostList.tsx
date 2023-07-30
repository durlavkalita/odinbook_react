import PostDisplay from "./PostDisplay";
import { PostType } from "../../types/postTypes";

interface Props {
  posts: PostType[];
}
const PostList = ({ posts }: Props) => {
  return (
    <div className="border rounded-lg p-4">
      {posts.map((post) => (
        <PostDisplay key={post._id} post={post}></PostDisplay>
      ))}
    </div>
  );
};

export default PostList;
