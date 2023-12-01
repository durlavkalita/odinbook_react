import { PostWithComments } from "./postTypes";

export type User = {
  _id: string;
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profile_pic: string;
};

export type UserWithPosts = User & {
  postWithComments: PostWithComments[];
};

export type UserWithFriends = User & {
  friends: User[];
  postsWithComments: PostWithComments[];
};
