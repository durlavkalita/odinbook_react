import React from "react";
import { UserType } from "../../types/userTypes";

type User = UserType & {
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
        <li key={user.email} className="py-4">
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <img
                className="h-8 w-8 rounded-full"
                src={user.profile_pic}
                alt={user.firstName}
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user.firstName + user.lastName}
              </p>
              <p className="text-sm text-gray-500 truncate">{user.email}</p>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default UsersList;
