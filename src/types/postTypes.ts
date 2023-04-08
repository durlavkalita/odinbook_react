import { UserType } from "./userTypes";
import { CommentType } from "./commentTypes";

export type PostType = {
  _id: number;
  author: UserType;
  content: string;
  created_at: Date;
  liked_by: { _id: string }[];
  comments: CommentType[];
};
