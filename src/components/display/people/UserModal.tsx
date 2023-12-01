import React from "react";
import { Link } from "react-router-dom";

interface Props {
  id: string;
  profile_pic: string;
  firstName: string;
  lastName: string;
  email: string;
  children: React.ReactNode;
}

function UserModal({
  id,
  profile_pic,
  firstName,
  lastName,
  email,
  children,
}: Props) {
  return (
    <div className="flex items-center space-x-4 p-4 max-w-xl">
      <div className="flex-shrink-0">
        <Link to={id}>
          <img
            className="h-8 w-8 rounded-full"
            src={profile_pic}
            alt={firstName}
          />
        </Link>
      </div>
      <div className="flex-1 min-w-0">
        <Link to={id}>
          <p className="text-sm font-medium text-gray-900 truncate">
            {firstName} {lastName}
          </p>
        </Link>
        <p className="text-sm text-gray-500 truncate">{email}</p>
      </div>
      <div>{children}</div>
    </div>
  );
}

export default UserModal;
