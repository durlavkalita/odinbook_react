import PostModal from "./PostModal";
import { PostWithComments } from "../../../types/postTypes";

interface Props {
  posts: PostWithComments[];
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
