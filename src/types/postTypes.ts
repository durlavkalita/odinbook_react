import { User } from "./userTypes";
import { Comment } from "./commentTypes";

export type Post = {
  _id: number;
  author: User;
  content: string;
  created_at: Date;
  liked_by: { _id: string }[];
};

export type PostWithComments = Post & {
  comments: Comment[];
};
