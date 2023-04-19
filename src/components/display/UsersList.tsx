import React from "react";
import { UserType } from "../../types/userTypes";
import UserDisplay from "./UserDisplay";

type User = UserType & {
  _id: string;
  profile_pic: string;
};

interface UserListProps {
  users: User[];
}

function UsersList(props: UserListProps) {
  const { users } = props;
  return (
    <ul className="divide-y divide-gray-300">
      {users.map((user) => (
        <UserDisplay key={user._id} {...user}></UserDisplay>
      ))}
    </ul>
  );
}

export default UsersList;
