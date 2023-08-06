import PostModal from "./PostModal";
import { PostType } from "../../../types/postTypes";

interface Props {
  posts: PostType[];
}
const PostList = ({ posts }: Props) => {
  return (
    <div>
      {posts.map((post) => (
        <PostModal key={post._id} post={post}></PostModal>
      ))}
    </div>
  );
};

export default PostList;
