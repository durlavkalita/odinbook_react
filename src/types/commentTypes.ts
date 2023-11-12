import { User } from "./userTypes";

export type Comment = {
  _id: number;
  author: User;
  content: string;
  post: string;
  created_at: Date;
};
