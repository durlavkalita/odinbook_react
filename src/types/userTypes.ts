import { PostWithComments } from "./postTypes";

export type User = {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  profile_pic: string;
};

export type UserWithFriends = User & {
  friends: User[];
  postsWithComments: PostWithComments[];
};
