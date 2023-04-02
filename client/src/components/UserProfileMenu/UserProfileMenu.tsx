import Image from "next/image";
import React from "react";
import useAuth from "../../hooks/useAuth";

export const UserProfileMenu: React.FC = () => {
  const { userProfile } = useAuth();
  return (
    <div className="flex justify-between gap-2">
      {userProfile?.pictureUrl && (
        <div className="dropdown">
          <label tabIndex={0} className="btn btn-circle">
            <Image
              src={userProfile.pictureUrl}
              width={50}
              height={50}
              className="rounded-full"
              alt="User profile picture"
            />
          </label>
          <ul
            tabIndex={0}
            className="p-2 shadow dropdown-content menu bg-base-100 rounded-box w-52"
          >
            {/* TODO Implement action items for the user menu */}
          </ul>
        </div>
      )}
    </div>
  );
};
