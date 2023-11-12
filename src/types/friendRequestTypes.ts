import { User } from "./userTypes";

export type FriendRequest = {
  _id: string;
  recipient: User;
  sender: User;
  action: string;
};
